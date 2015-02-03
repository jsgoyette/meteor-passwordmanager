Router.route('/:module', function() {

  this.wait(Meteor.subscribe('moduledefs'));

  if (this.ready()) {

    var pathName = this.params.module;
    var defs = Modules.Defs.findOne({path: pathName});

    var template = (defs && defs.layouts && defs.layouts.list && defs.layouts.list.template)
      || 'defaultList';

    if (!defs) {
      return this.render('404', {
        data: { message: 'Module not defined' }
      });
    }

    this.render(template, {
      data: function() {
        return {
          defs: defs || {},
        }
      },
    });
  }
  else {

    this.render('loading');

  }

});

Router.route('/:module/:id', function(a, b) {

  this.wait(Meteor.subscribe('moduledefs'));

  if (this.ready()) {

    var pathName = this.params.module;
    var defs = Modules.Defs.findOne({path: pathName});

    var template = (defs && defs.layouts && defs.layouts.list && defs.layouts.list.template)
      || 'defaultRecord';

    var collection = Modules.Collections[defs.collection] || null;

    if (!defs || !collection) {
      return this.render('404');
    }

    this.render(template, {
      data: function() {
        return {
          defs: defs || {},
          record: (collection && collection.findOne(this.params.id)) || {}
        }
      },
      waitOn: function() {
        return [Meteor.subscribe(collection, {_id: this.params._id})];
      }
    });
  }
  else {

    this.render('loading');

  }
});
