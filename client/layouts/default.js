import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.layout.helpers({
  isLoggingIn() {
    return Meteor.loggingIn();
  }
});
