var routes = {

  'passwordlist': {
    path: '/passwords',
    waitOn: function () {
      return [
        Meteor.subscribe('passwords'),
      ];
    }
  },

  'passwordnew': {
    path: '/passwords/new',
  },

  'password': {
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
};

Router.map(function() {
  _.each(routes, function(opts, name) {
    this.route(name, opts);
  }, this);
});
