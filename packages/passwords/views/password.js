var setReadonly = function (disabled) {
  $('[name="url"]').prop('readonly', Template.password.encrypted);
  $('[name="username"]').prop('readonly', Template.password.encrypted);
  $('[name="password"]').prop('readonly', Template.password.encrypted);
  $('[name="notes"]').prop('readonly', Template.password.encrypted);
}

var encrypt = function (e, template) {

  e.preventDefault();

  var url = $('[name="url"]').val();
  var username = $('[name="username"]').val();
  var password = $('[name="password"]').val();
  var notes = $('[name="notes"]').val();
  var key = $('#key').val();

  if (!key) return;

  if (Template.password.encrypted) {

    url = url ? Aes.Ctr.decrypt(url, key, 256) : '';
    username = username ? Aes.Ctr.decrypt(username, key, 256) : '';
    password = password ? Aes.Ctr.decrypt(password, key, 256) : '';
    notes = notes ? Aes.Ctr.decrypt(notes, key, 256) : '';
    Template.password.encrypted = false;

    $('.decrypt').html('Encrypt');
    $('.decrypt').addClass('encrypt').removeClass('decrypt');
    $('.save').attr("disabled", "disabled");
    $(".save").removeClass("btn-success");

  } else {

    url = url ? Aes.Ctr.encrypt(url, key, 256) : '';
    username = username ? Aes.Ctr.encrypt(username, key, 256) : '';
    password = password ? Aes.Ctr.encrypt(password, key, 256) : '';
    notes = notes ? Aes.Ctr.encrypt(notes, key, 256) : '';
    Template.password.encrypted = true;

    $('.encrypt').html('Decrypt');
    $('.encrypt').addClass('decrypt').removeClass('encrypt');
    $(".save").removeAttr("disabled");
    $(".save").addClass("btn-success");
  }

  $('[name="url"]').val(url);
  $('[name="username"]').val(username);
  $('[name="password"]').val(password);
  $('[name="notes"]').val(notes);

  // set disabled if encrypted
  setReadonly();
}

Template.password.events({

  'click #encrypt': encrypt,
  'submit #encryptform': encrypt,

  'click #confirmDelete': function (e, template) {
    var nickname = this.nickname;
    if (confirm('Do you really want to delete this password?')) {
      Passwords.update({ _id: this._id }, { $set: {deleted: true} }, function (err, affected) {
        Router.go('passwordlist');
      });
    }
  }

});

Template.passwordnew.events({

  'click #encrypt': encrypt,
  'submit #encryptform': encrypt,

  'click #generate': function(e) {

    var genpass = function(len) {
      var pass = '';
      for (i = len; i > 0; i--) {
          var rand = Math.floor(Math.random() * 61 + 48);
          rand += rand > 57 ? (rand > 83 ? 13 : 7) : 0;
          pass += String.fromCharCode(rand);
      }
      return pass;
    }

    var message = genpass(16) + "\n" + genpass(16) + "\n" + genpass(16) + "\n"
                + genpass(16) + "\n" + genpass(16);

    Mediator.publish('notification', {
      text: message,
      icon: '',
      nonblock: {
        nonblock: false,
      }
    });
  }

});

var onSubmitError = function (operation, error, template) {
  Mediator.publish('notification', {
    text: error,
    type: 'error',
    icon: 'glyphicon glyphicon-info-sign'
  });
};

var onSubmitSuccess = function (operation, result, template) {

  if (operation == 'update') {

    var doc = template.data.doc;

    if (doc && doc.deleted) {
      Mediator.publish('notification', {
        text: doc.nickname + ' was successfully deleted.',
        type: 'info',
        icon: 'glyphicon glyphicon-trash'
      });
    }
    else if (doc) {
      Mediator.publish('notification', {
        text: doc.nickname + ' was successfully saved!',
        type: 'success',
        icon: 'glyphicon glyphicon-ok-sign'
      });
    }
  }
  else if (operation == 'insert') {

    Mediator.publish('notification', {
      text: 'Password was successfully saved.',
      type: 'success',
      icon: 'glyphicon glyphicon-trash'
    });

    Router.go('password', {id: result});
  }
};

AutoForm.hooks({

  passwordForm: {
    onError: onSubmitError,
    onSuccess: onSubmitSuccess,
  },

  passwordNewForm: {
    onError: onSubmitError,
    onSuccess: onSubmitSuccess,
  }
});

Template.password.rendered = function () {

  // reset encrypted state
  Template.password.encrypted = true;
  setReadonly();

  // ui adjustments
  $(document).scrollTop(0);
  $('#key').focus();
};

Template.passwordnew.rendered = function () {

  // reset encrypted state
  Template.passwordnew.encrypted = true;
  setReadonly();

  // ui adjustments
  $(document).scrollTop(0);
  $('#key').focus();
};