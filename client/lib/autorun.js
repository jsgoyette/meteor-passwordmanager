Meteor.autorun(function() {

  // Whenever this session variable changes, run this function.
  var opts = Session.get('displayMessage');

  var defaults = {
    title: 'Message',
    text: '',
    type: 'success',
    icon: 'glyphicon glyphicon-exclamation-sign',
    // icon: 'picon picon-mail-unread-new',
    addclass: 'custom',
    opacity: .92,
    width: '260px',
    delay: 4000,
    animate_speed: 500,
    nonblock: {
      nonblock: true
    }
  };

  var message = _.extend(defaults, opts);

  // only show message if opts has a value
  if (!_.isEmpty(opts)) {
    new PNotify(message);
  }

  Session.set('displayMessage', null);

});