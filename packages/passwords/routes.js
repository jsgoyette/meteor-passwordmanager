var routes = [
  {
    'name': 'passwordlist',
    'opts': {
      path: '/passwords',
      data: function () {
        return {
          // passwordlist: Passwords.find({}, {sort: {nickname: 1}}).fetch()
        }
      },
      waitOn: function () {
        return [
          Meteor.subscribe('passwords'),
        ];
      }
    }
  }, {
    'name': 'passwordnew',
    'opts': {
      path: '/passwords/new',
    }
  }, {
    'name': 'password',
    'opts': {
      path: '/passwords/:id',
      data: function() {
        return Passwords.findOne(this.params.id);
      },
      waitOn: function () {
        return [
          Meteor.subscribe('passwords', {_id: this.params.id}),
        ];
      }
    }
  }
];

Router.map(function() {
  _.each(routes, function(r) {
    this.route(r.name, r.opts);
  }, this);
});
