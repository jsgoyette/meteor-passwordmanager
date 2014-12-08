var routes = [
  {
    'name': 'notesnew',
    'opts': {
      path: '/notes',
      data: function () {
        return {
          // passwordlist: Passwords.find({}, {sort: {nickname: 1}}).fetch()
        }
      },
      waitOn: function () {
        return [
          Meteor.subscribe('notes'),
        ];
      }
    }
  },
  {
    'name': 'notes',
    'opts': {
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
  }
];

Router.map(function() {
  _this = this;
  _.each(routes, function(r) {
    _this.route(r.name, r.opts);
  });
});
