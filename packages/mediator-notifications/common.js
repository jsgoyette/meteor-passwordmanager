Meteor.startup(function() {
  return Tracker.autorun(function() {
    var args = Mediator.subscribe('notification');
    if (args) {
      return Notify.setMessage(args[1]);
    }
  });
});

this.Notify = {
  setMessage: function(message) {}
};
