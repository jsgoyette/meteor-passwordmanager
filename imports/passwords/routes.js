import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

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
