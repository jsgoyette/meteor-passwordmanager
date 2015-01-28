var routes = {

  'contactlist': {
    path: '/contacts',
  },

  'contactnew': {
    path: '/contacts/new',
  },

  'contact': {
    path: '/contacts/:id',
    data: function() {
      return Contacts.findOne(this.params.id);
    },
    waitOn: function () {
      return [
        Meteor.subscribe('contacts', {_id: this.params.id})
      ];
    }
  }
};

Router.map(function() {
  _.each(routes, function(opts, name) {
    this.route(name, opts);
  }, this);
});
