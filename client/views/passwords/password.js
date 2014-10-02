Template.password.helpers({
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

  if (Template.password.encrypted) {
    url = url ? Meteor.Aes.Ctr.decrypt(url, key, 256) : '';
    username = username ? Meteor.Aes.Ctr.decrypt(username, key, 256) : '';
    password = password ? Meteor.Aes.Ctr.decrypt(password, key, 256) : '';
    notes = notes ? Meteor.Aes.Ctr.decrypt(notes, key, 256) : '';
    Template.password.encrypted = false;
    $('.decrypt').html('Encrypt');
    $('.decrypt').addClass('encrypt').removeClass('decrypt');
    $('.save').attr("disabled", "disabled");
    $(".save").removeClass("btn-success");

  } else {
    url = url ? Meteor.Aes.Ctr.encrypt(url, key, 256) : '';
    username = username ? Meteor.Aes.Ctr.encrypt(username, key, 256) : '';
    password = password ? Meteor.Aes.Ctr.encrypt(password, key, 256) : '';
    notes = notes ? Meteor.Aes.Ctr.encrypt(notes, key, 256) : '';
    Template.password.encrypted = true;
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
  $('#url').prop('disabled', Template.password.encrypted);
  $('#username').prop('disabled', Template.password.encrypted);
  $('#password').prop('disabled', Template.password.encrypted);
  $('#notes').prop('disabled', Template.password.encrypted);

}

Template.password.events({

  'click #encrypt': encrypt,

  'submit #encryptform': encrypt,

  'click #save': function (e) {

    if (!$('#nickname').val()) return;

    var fieldValues = {
      nickname: $('#nickname').val(),
      url: $('#url').val(),
      username: $('#username').val(),
      password: $('#password').val(),
      notes: $('#notes').val()
    };

    var _this = this;

    Passwords.update({ _id: this._id }, { $set: fieldValues }, function (err, affected) {
      if (err) {
        new PNotify({
          title: 'Save Error',
          text: err,
          type: 'error',
          icon: 'glyphicon glyphicon-info-sign'
        });
      } else {
        new PNotify({
          title: 'Password Saved',
          text: _this.nickname + ' was successfully saved!',
          type: 'success',
          icon: 'glyphicon glyphicon-ok-sign'
        });
      }
    });
  },

  'click #confirmDelete': function (e) {
    var nickname = this.nickname;
    if (confirm('Do you really want to delete this password?')) {
      Passwords.update({ _id: this._id }, { $set: {deleted: true} }, function (err, affected) {
        new PNotify({
          title: 'Password Deleted',
          text: nickname + ' was successfully deleted.',
          type: 'error',
          icon: 'glyphicon glyphicon-trash'
        });

        Router.go('/');
      });
    }
  }

});

Template.password.rendered = function () {

  // reset encrypted state
  Template.password.encrypted = true;

  // ui adjustments
  $(document).scrollTop(0);
  $('#key').focus();
};