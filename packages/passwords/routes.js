FlowRouter.route('/passwords', {

  name: 'passwordlist',

  action: function() {
    BlazeLayout.render('layout', { content: 'passwordlist', protect: true });
  },

});

FlowRouter.route('/passwords/:id', {

  name: 'password',

  action: function(params) {
    BlazeLayout.render('layout', {
      content: 'password',
      protect: true,
      id: params.id
    });
  },

});
