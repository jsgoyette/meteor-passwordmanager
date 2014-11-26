var routes = [
  {
    'name': 'notesnew',
    'opts': {
      path: '/notes',
      layoutTemplate: 'layout-nocontainer',
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
      layoutTemplate: 'layout-nocontainer',
      data: function () {
        // console.log(this.params.id);
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
