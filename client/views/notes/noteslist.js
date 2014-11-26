var setActiveTag = function (tag) {
    setTimeout(function () {
      $('.tag-list .list-group-item').removeClass('active');
      if (tag && $('[data-tag="'+tag+'"]').length) {
        $('[data-tag="'+tag+'"]').addClass('active');
      } else {
        $('.tags-all').addClass('active');
      }
    }, 10);
}

Template.noteslist.rendered = function () {
  setActiveTag(Session.get('currentTag', ''));
}

Template.noteslist.helpers({

    notes: function () {

      var currentTag = Session.get('currentTag') || {};
      if (!_.isEmpty(currentTag)) {
        currentTag = {
          tags: currentTag
        };
      }

      var searchFilter = Session.get('searchFilter') || {};
      if (!_.isEmpty(searchFilter)) {
        searchFilter = {
          $or: [
            { title: { $regex: searchFilter }},
            { text: { $regex: searchFilter }},
            { tags: { $regex: searchFilter }},
          ]
        };
      }

      var find = { $and: [currentTag, searchFilter]};

      return Notes.find(find, { sort: {modified: -1}} ).fetch();
    },

    tags: function () {

      var find = {};
      var options = {
        tags: 1,
        _id: 0
      };

      var searchFilter = Session.get('searchFilter') || {};

      if (!_.isEmpty(searchFilter)) {
        find = {
          $or: [
            { title: { $regex: searchFilter }},
            { text: { $regex: searchFilter }},
            { tags: { $regex: searchFilter }},
          ]
        };
      }

      var notes = Notes.find(find, options).fetch();

      var tag_counter = {};
      var all_tags = _.flatten(_.pluck(notes, "tags"))
        .filter(function (e) { return e; });

      for (var i = 0; i < all_tags.length; i++) {
        if (tag_counter[all_tags[i]]) {
          tag_counter[all_tags[i]]++;
        } else {
          tag_counter[all_tags[i]] = 1;
        }
      };

      var tags = _.map(tag_counter, function (val, idx) {
        return {
          name: idx,
          count: val
        }
      });

      return _.sortBy(tags, function (val) {
        return val.name;
      });

    }

});


Template.noteslist.events({

  'click .tag-list a': function () {
    Session.set('currentTag', this.name || '');
    setActiveTag(this.name);
  },

  'click .addnote': function () {
    Session.set('currentNote', '');
  },

  'keyup #search': function (e) {
    Session.set('searchFilter', $('#search').val());
    setActiveTag(Session.get('currentTag'));
  },

  'click #search-clear': function (e) {
    $('#search').val('');
    Session.set('searchFilter', null);
    setActiveTag(Session.get('currentTag'));
  }

});

