ListController = function(opts) {

  var self = this;

  self._deps = {};
  self._deps['pages']   = new Tracker.Dependency;
  self._deps['filter']  = new Tracker.Dependency;
  self._deps['options'] = new Tracker.Dependency;

  opts = opts || {};

  var key = opts.key || 'default';
  var filter = opts.filter || '';
  var pageSize = opts.pageSize || 10;

  var filteredTotal = 0;

  var options = {
    skip: 0,
    limit: pageSize,
    sort: {}
  };

  if (opts.options) {
    _.extend(options, opts.options);
  }

  // load in session data if exists
  var session = Session.get(key + 'QueryData');
  if (session) {
    filter = session.filter;
    _.extend(options, session.options);
  }

  // private helper function to store data in session
  var setSession = function() {
    Session.set(key + 'QueryData', {
      filter: filter,
      options: options
    });
  }

  self.getFilter = function() {
    self._deps['filter'].depend();
    return filter;
  };

  self.setFilter = function(value) {
    if (value === filter) {
      return;
    }
    filter = value;
    options.skip = 0;
    options.limit = pageSize;
    setSession();
    self._deps['options'].changed();
    self._deps['filter'].changed();
  };

  self.getOptions = function() {
    self._deps['options'].depend();
    // use jquery to return deep copy
    return $.extend(true, {}, options);
  };

  self.paginateUp = function() {
    options.limit = pageSize;
    if (options.skip + options.limit >= filteredTotal) {
      return;
    }
    options.skip += pageSize;
    setSession();
    self._deps['options'].changed();
  };

  self.paginateDown = function() {
    options.limit = pageSize;
    if (options.skip < 1) {
      return;
    } else if (options.skip < options.limit) {
      options.skip = 0;
    } else {
      options.skip -= pageSize;
    }
    setSession();
    self._deps['options'].changed();
  };

  self.scroll = function() {
    options.limit += pageSize;
    self._deps['options'].changed();
  };

  self.setSort = function(sortField) {
    var sort = {};
    if (options.sort.hasOwnProperty(sortField)) {
      sort[sortField] = options.sort[sortField] * -1;
      delete options.sort[sortField];
    } else {
      sort[sortField] = 1;
    }
    options.sort = _.extend(sort, options.sort);
    options.skip = 0;
    setSession();
    self._deps['options'].changed();
  };

  self.getFilteredTotal = function() {
    self._deps['pages'].depend();
    return filteredTotal;
  };

  self.setFilteredTotal = function(value) {
    filteredTotal = 1 * value || 0;
    self._deps['pages'].changed();
  };

  return self;

};


var makeRegex = function(filterStr, fields) {
  if (!filterStr || !fields) {
    return {};
  }

  // force array
  if (!_.isArray(fields)) {
    fields = [fields];
  }

  try {
    var search = new RegExp(filterStr, 'i');
  } catch (e) {
    var search = new RegExp('');
  }

  // search all fields against search pattern if set
  var or = _.map(fields, function(field) {
    var f = {};
    f[field] = {
      $regex: filterStr,
      $options: 'i',
    };
    return f;
  });

  return { $or: or };
};

Template.list.created = function () {

  // key is used for the subscription name, the filteredTotal
  // meteor method name and for namespacing the session store
  var key = this.data.key;

  // fields is an array of field names
  var fields = this.data.fields;

  listController = ListController({
    key: key,
    options: this.data.options || {}
  });

  // if filter or options change, update subscription
  Tracker.autorun(function() {

    var filter = listController.getFilter();
    filter = makeRegex(filter, fields);

    var options = listController.getOptions();

    // force clear the subscription to prevent left-over records
    if (listSubscription) {
      listSubscription.stop();
    }

    listSubscription = Meteor.subscribe(key, filter, options);
  });

  // if filter changes, update filteredTotal
  Tracker.autorun(function() {

    var filter = listController.getFilter();
    filter = makeRegex(filter, fields);

    Meteor.call(key + 'FilteredTotal', filter, function (err, res) {
      listController.setFilteredTotal(res || 0);
    });
  });

};

Template.list.rendered = function () {
  $('#filter').focus();

  // run the above func every time the user scrolls
  // $(window).scroll(showMoreVisible);
};

Template.list.helpers({

  filter: function() {
    return listController.getFilter();
  },

  showingFrom: function() {
    var options = listController.getOptions();
    var count = this.collection.find().count();
    return options.skip + (count ? 1 : 0);
  },

  showingTo: function() {
    var options = listController.getOptions();
    var count = this.collection.find().count();
    return options.skip + (count < options.limit ?
      count : options.limit);
  },

  filteredTotal: function() {
    return listController.getFilteredTotal();
  },

  moreResults: function() {
    var options = listController.getOptions();
    var count = this.collection.find().count();
    return false;
    return !(count < options.limit);
  },

});

Template.list.events({

  'keyup #filter': function (e, template) {

    // on enter go to first href in list-item
    if (e.keyCode == 13) {
      var url = $('.list-item a').first().prop('href');
      if (url) {
        Router.go(url);
      }
    }
    else {

      var filter = '';

      // clear filter on escape
      if (e.keyCode != 27) {
        filter = $('#filter').val();
      }

      listController.setFilter(filter);
    }
  },

  'click .more': function (e, template) {
    listController.paginateUp();
  },

  'click .back': function (e, template) {
    listController.paginateDown();
  }

});

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
  var threshold, target = $("#showMoreResults");
  if (!target.length) return;

  threshold = $(window).scrollTop() + $(window).height() - target.height();

  if (target.offset().top < threshold) {
    if (!target.data("visible")) {
      // console.log("target became visible (inside viewable area)");
      target.data("visible", true);
      listController.scroll();
    }
  } else {
    if (target.data("visible")) {
      // console.log("target became invisible (below viewable arae)");
      target.data("visible", false);
    }
  }
}


/**
 * listHeader
 */
Template.listHeader.helpers({

  header: function() {

    var options = listController.getOptions();
    var schema = this.schema;
    var header = [];

    _.each(this.fields, function (field, idx) {

      var fieldSchemata = schema[field] || {};
      var sortIcon = 'fa fa-sort';

      if (options.sort.hasOwnProperty(field)) {
        if (options.sort[field] == 1) {
          sortIcon = 'fa fa-sort-asc';
        } else {
          sortIcon = 'fa fa-sort-desc';
        }
      }

      var label = fieldSchemata.label || field;

      header.push({
        name: field,
        label: label,
        sortIcon: sortIcon
      });
    });

    return header;
  }

});

Template.listHeaderItem.events({
  'click': function(e, template) {
    listController.setSort(this.name);
  }
});

Template.listItems.helpers({

  key: function() {
    return this.key;
  },

  collection: function() {

    var filter = listController.getFilter();
    var options = listController.getOptions();
    options.skip = 0;

    var key = this.key;
    var fields = this.fields;
    var collection = this.collection.find({}, options).fetch();

    collection = _.map(collection, function(record) {

      var fieldArray = [];
      var idx = function (obj, i) { return obj[i] };

      _.each(fields, function(field) {
        // use reduce to access deep properties, like "address.city"
        var value = field.split('.').reduce(idx, record);
        fieldArray.push({
          name: field,
          value: value,
        });
      });

      return {
        collectionName: key,
        _id: record._id,
        fields: fieldArray
      }
    });

    return collection;
  },

});
