import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {

  name: 'home',

  action: function(params, queryParams) {
    FlowRouter.go('/create');
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('layout', { content: '' });
  }
};
