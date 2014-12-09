var routes = {

  'notesnew': {
    path: '/notes',
    waitOn: function () {
      return [
        Meteor.subscribe('notes'),
      ];
    }
  },

  'notes': {
    path: '/notes/:id',
    data: function () {
      return Notes.findOne(this.params.id);
    },
    waitOn: function () {
      return [
        Meteor.subscribe('notes'),
      ];
    }
  }
};

Router.map(function() {
  _.each(routes, function(opts, name) {
    this.route(name, opts);
  }, this);
});
