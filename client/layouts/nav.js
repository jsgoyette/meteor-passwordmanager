import { Template } from 'meteor/templating';

Template.nav.onCreated(function() {
  // Meteor.subscribe('moduledefs');
});

Template.nav.helpers({
  modules() {
    // return Modules.Defs.find();
  }
});
