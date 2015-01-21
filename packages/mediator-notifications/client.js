var stack_topright = {
  'dir1': 'down',
  'dir2': 'left',
  'push': 'top',
  'spacing1': 10
};

Notify.setMessage = function(opts) {

  if (typeof(opts) === 'string') {
    opts = { text: opts };
  }

  var defaults = {
    title: '',
    text: '',
    type: 'success',
    icon: 'glyphicon glyphicon-exclamation-sign',
    // icon: 'picon picon-mail-unread-new',
    addclass: 'common',
    opacity: '.86',
    width: '260px',
    delay: 4000,
    animate_speed: 500,
    shadow: false,
    nonblock: {
      nonblock: true
    },
    stack: stack_topright
  };

  var message = _.extend(defaults, opts);

  // only show message if opts has a value
  if (!_.isEmpty(opts)) {
    new PNotify(message);
  }

  // return console.log('CLIENT MESSAGE: ', message);

};
