import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {

  name: 'home',

  action(params, queryParams) {
    FlowRouter.go('/create');
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('layout', { content: '' });
  }
};
