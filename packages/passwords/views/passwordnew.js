Template.passwordnew.helpers({
  params: function() {
    return params;
  }
});

function encrypt(e) {

  e.preventDefault();

  var url = $('#url').val();
  var username = $('#username').val();
  var password = $('#password').val();
  var notes = $('#notes').val();
  var key = $('#key').val();

  if (!key) return;

  if (Template.passwordnew.encrypted) {
    url = url ? Aes.Ctr.decrypt(url, key, 256) : '';
    username = username ? Aes.Ctr.decrypt(username, key, 256) : '';
    password = password ? Aes.Ctr.decrypt(password, key, 256) : '';
    notes = notes ? Aes.Ctr.decrypt(notes, key, 256) : '';
    Template.passwordnew.encrypted = false;
    $('.decrypt').html('Encrypt');
    $('.decrypt').addClass('encrypt').removeClass('decrypt');
    $('.save').attr("disabled", "disabled");
    $(".save").removeClass("btn-success");

  } else {
    url = url ? Aes.Ctr.encrypt(url, key, 256) : '';
    username = username ? Aes.Ctr.encrypt(username, key, 256) : '';
    password = password ? Aes.Ctr.encrypt(password, key, 256) : '';
    notes = notes ? Aes.Ctr.encrypt(notes, key, 256) : '';
    Template.passwordnew.encrypted = true;
    $('.encrypt').html('Decrypt');
    $('.encrypt').addClass('decrypt').removeClass('encrypt');
    $(".save").removeAttr("disabled");
    $(".save").addClass("btn-success");
  }

  $('#url').val(url);
  $('#username').val(username);
  $('#password').val(password);
  $('#notes').val(notes);

  // set disabled if encrypted
  $('#url').prop('disabled', Template.passwordnew.encrypted);
  $('#username').prop('disabled', Template.passwordnew.encrypted);
  $('#password').prop('disabled', Template.passwordnew.encrypted);
  $('#notes').prop('disabled', Template.passwordnew.encrypted);

}

Template.passwordnew.events({

  'click #encrypt': encrypt,

  'submit #encryptform': encrypt,

  'click #save': function (e) {

    if (!$('#nickname').val()) return;

    var fieldValues = {
      nickname: $('#nickname').val(),
      url: $('#url').val(),
      username: $('#username').val(),
      password: $('#password').val(),
      notes: $('#notes').val(),
      userid: Meteor.userId(),
      deleted: false
    };

    Passwords.insert(fieldValues, function (err, id) {
      if (err) {
        Mediator.publish('notification', {
          text: err,
          type: 'error',
          icon: 'glyphicon glyphicon-info-sign'
        });
      } else {
        Mediator.publish('notification', {
          text: fieldValues.nickname + ' was successfully saved!',
          type: 'success',
          icon: 'glyphicon glyphicon-plus'
        });
        Router.go('/password/' + id);
      }
    });

  },

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
      icon: ''
    });
  }

});

Template.passwordnew.rendered = function () {

  // reset encrypted state
  Template.passwordnew.encrypted = true;

  // ui adjustments
  $(document).scrollTop(0);
  $('#key').focus();
};