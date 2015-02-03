Template.nav.created = function() {
  Meteor.subscribe('moduledefs');
}

Template.nav.helpers({
  'modules': function() {
    return Modules.Defs.find();
  }
});