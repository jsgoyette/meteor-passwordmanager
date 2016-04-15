import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Mediator } from 'meteor/jsgoyette:mediator';
import { Aes } from 'meteor/jsgoyette:aes';
import { SHA256 } from 'meteor/sha';
import { Passwords } from '../collections.js';

const isEncrypted = ReactiveVar(true);

isEncrypted.toggle = function() {
  const other = !this.get();
  this.set(other);
};

Template.password.onCreated(function() {

  isEncrypted.set(true);

  const template = Template.instance();

  template.autorun(() => {
    template.data.id = FlowRouter.getParam('id');
    template.subscribe('passwords', { _id: template.data.id });
  });
});

Template.password.onRendered(function() {
  $(document).scrollTop(0);
  $('#key').focus();
});

Template.password.helpers({
  Passwords() {
    return Passwords;
  },
  password() {
    const id = FlowRouter.getParam('id');
    return Passwords.findOne({ _id: id }) || {};
  },
  formType() {
    return this.id && this.id != 'new' ? 'update' : 'insert';
  },
  isEncrypted() {
    return isEncrypted.get();
  },
  encryptButtonLabel() {
    return isEncrypted.get() ? 'Decrypt' : 'Encrypt';
  },
  saveButtonAttributes() {
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
const encrypt = (e, template) => {

  e.preventDefault();

  let key = $('#key').val();
  if (!key) return;

  let fieldNames = ['url', 'username', 'password', 'notes'];
  let func = isEncrypted.get() ? 'decrypt' : 'encrypt';

  if ($('[name="hashed"]').val() || func == 'encrypt') {
    key = SHA256(key);
  }

  if (func == 'encrypt') {
    $('[name="hashed"]').val(true);
  }

  func = Aes.Ctr[func];

  let translateFieldValue = (fieldName) => {
    let field = $(`[name="${fieldName}"]`).val();
    field = field && func(field, key, 256);
    $(`[name="${fieldName}"]`).val(field);
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

  'click #confirmDelete'(e, template) {
    if (confirm('Do you really want to delete this password?')) {
      let query = { _id: this.id };
      let update = { $set: { deleted: true } };
      Passwords.update(query, update, (err, doc) => {
        FlowRouter.go('passwordlist');
      });
    }
  },

  'click #generate'(e, template) {

    const genpass = (len) => {

      let pass = '';

      for (i = len; i > 0; i--) {
        let rand = Math.floor(Math.random() * 61 + 48);
        rand += rand > 57 ? (rand > 83 ? 13 : 7) : 0;
        pass += String.fromCharCode(rand);
      }

      return pass;
    };

    let message = genpass(20) + "\n" + genpass(20)
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
