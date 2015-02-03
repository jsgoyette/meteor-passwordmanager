Template['404'].helpers({

  message: function() {
    return this.message || 'Page not found';
  },

  description: function() {
    return this.description;
  },

});
