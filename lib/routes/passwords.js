var routes = [
  {
    'name': 'passwordlist',
    'opts': {
      path: '/',
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
      path: '/password/new',
    }
  }, {
    'name': 'password',
    'opts': {
      path: '/password/:id',
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

Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  _this = this;
  _.each(routes, function(r) {
    _this.route(r.name, r.opts);
  });
});
