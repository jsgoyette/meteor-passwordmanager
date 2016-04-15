import { Template } from 'meteor/templating';

Template.nav.onCreated(function() {
  // Meteor.subscribe('moduledefs');
});

Template.nav.helpers({
  'modules': function() {
    // return Modules.Defs.find();
  }
});
