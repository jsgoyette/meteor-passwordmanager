import { Template } from 'meteor/templating';

Template.layout.helpers({
  isLoggingIn() {
    return Meteor.loggingIn();
  }
});
