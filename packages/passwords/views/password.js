var isEncrypted = ReactiveVar(true);

isEncrypted.toggle = function() {
  var encrypted = !this.get();
  this.set(encrypted);
};

Template.password.onCreated(function() {

  isEncrypted.set(true);

  var template = Template.instance();

  template.autorun(function() {
    template.data.id = FlowRouter.getParam('id');
    template.subscribe('passwords', { _id: template.data.id });
  });
});

Template.password.onRendered(function() {
  $(document).scrollTop(0);
  $('#key').focus();
});

Template.password.helpers({
  password: function() {
    var id = FlowRouter.getParam('id');
    return Passwords.findOne({ _id: id }) || {};
  },
  formType: function() {
    return this.id && this.id != 'new' ? 'update' : 'insert';
  },
  isEncrypted: function() {
    return isEncrypted.get();
  },
  encryptButtonLabel: function() {
    return isEncrypted.get() ? 'Decrypt' : 'Encrypt';
  },
  saveButtonAttributes: function() {
    if (isEncrypted.get()) {
      return {
        class: 'btn btn-success',
      }
    }
    return {
      class: 'btn',
      disabled: true
    }
  }
});

/**
 * encrypt event:
 * toggle field values and trigger UI changes
 */
var encrypt = function(e, template) {

  e.preventDefault();

  var key = $('#key').val();
  if (!key) return;

  var fieldNames = ['url', 'username', 'password', 'notes'];
  var func = isEncrypted.get() ? 'decrypt' : 'encrypt';

  if ($('[name="hashed"]').val() || func == 'encrypt') {
    var key = SHA256(key);
  }

  if (func == 'encrypt') {
    $('[name="hashed"]').val(true);
  }

  func = Aes.Ctr[func];

  var translateFieldValue = function(fieldName) {
    var field = $('[name="'+fieldName+'"]').val();
    field = field && func(field, key, 256);
    $('[name="'+fieldName+'"]').val(field);
  };

  // toggle encrypted each of the field values
  _.each(fieldNames, function(fieldName) {
    translateFieldValue(fieldName);
  });

  // toggle encrypted for UI
  isEncrypted.toggle();
};

Template.password.events({

  'click #encrypt': encrypt,
  'submit #encryptform': encrypt,

  'click #confirmDelete': function(e, template) {
    if (confirm('Do you really want to delete this password?')) {
      var query = { _id: this.id };
      var update = { $set: { deleted: true } };
      Passwords.update(query, update, function(err, doc) {
        FlowRouter.go('passwordlist');
      });
    }
  },

  'click #generate': function(e, template) {

    var genpass = function(len) {

      var pass = '';

      for (i = len; i > 0; i--) {
        var rand = Math.floor(Math.random() * 61 + 48);
        rand += rand > 57 ? (rand > 83 ? 13 : 7) : 0;
        pass += String.fromCharCode(rand);
      }

      return pass;
    }

    var message = genpass(20) + "\n" + genpass(20)
         + "\n" + genpass(20) + "\n" + genpass(20)
         + "\n" + genpass(20) + "\n" + genpass(20);

    Mediator.publish('notification', {
      text: message,
      icon: '',
      nonblock: {
        nonblock: false,
      }
    });
  }

});

/**
 * AutoForm save notifications
 */
var notifyError = function(formType, error) {
  Mediator.publish('notification', {
    text: error,
    type: 'error',
    icon: 'glyphicon glyphicon-info-sign'
  });
};

var notifySuccess = function(formType, result) {

  // notifications
  if (formType == 'update') {

    var doc = this.template.data.doc;

    if (doc && doc.deleted) {
      Mediator.publish('notification', {
        text: doc.nickname + ' was successfully deleted.',
        type: 'info',
        icon: 'glyphicon glyphicon-trash'
      });
    }
    else if (doc) {
      Mediator.publish('notification', {
        text: doc.nickname + ' was successfully saved.',
        type: 'success',
        icon: 'glyphicon glyphicon-ok-sign'
      });
    }
  }
  else if (formType == 'insert') {

    Mediator.publish('notification', {
      text: 'Password was successfully created.',
      type: 'success',
      icon: 'glyphicon glyphicon-trash'
    });

    FlowRouter.go('password', { id: result });
  }
};

AutoForm.hooks({

  passwordForm: {
    onError: notifyError,
    onSuccess: notifySuccess,
  },

});
