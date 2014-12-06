var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var isValidPassword = function(val) {
  if (val.length >= 6) {
    return true;
  } else {
    Session.set('displayMessage', {
      title: 'Password too short.',
      type: 'error'
    });
    return false;
  }
}

Template.login.events({
  'keyup #login-password': function(e, t) {
    return false;
  },
  'submit #login-form' : function(e, t) {
    e.preventDefault();

    // retrieve the input field values
    var email = t.find('#login-email').value,
      password = t.find('#login-password').value;

    email = trimInput(email);

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        // inform user that login attempt failed
        Session.set('displayMessage', {
          title: 'Login error',
          text: err.reason || 'Unknown error.',
          type: 'error'
        });
      } else {
        // the user has been logged in
        Session.set('displayMessage', {});
        Router.go('/');
      }
    });

    return false;
  }
});

Template.register.events({
  'submit #register-form' : function(e, t) {
    e.preventDefault();

    var email = t.find('#account-email').value,
      username = t.find('#account-username').value;
      password = t.find('#account-password').value;

    // Trim and validate the input
    var email = trimInput(email);
    if (!isValidPassword(password)) return false;

    Meteor.call('createUser', {
      email: email,
      username : username,
      password : password
    }, function(err) {
      if (!err) {
        // success, account created...clear messages and redirect
        Session.set('displayMessage', {
          title: 'Almost done...',
          text: "Account created. Verification email sent.\n\nPlease check your"
            + 'email to complete email address verification process.',
          type: 'success'
        });
        Router.go('/');
      } else {
        // inform the user that account creation failed
        console.log(err);
        Session.set('displayMessage', {
          title: 'Error',
          text: err.reason,
          type: 'error'
        });
      }

    });

    return false;
  }
});

Template.passwordRecovery.events({

  'submit #recovery-form' : function(e, t) {
    e.preventDefault();
    var email = trimInput(t.find('#recovery-email').value);

    if (email) {
      Session.set('loading', true);
      Accounts.forgotPassword({email: email}, function (err) {
        if (err)
          Session.set('displayMessage', {
            title: 'Error',
            text: 'Could not send reset email',
            type: 'error'
          });
        else {
          Session.set('displayMessage', {
            title: 'Email Sent',
            text: 'Please check your email'
          });
        }
        Session.set('loading', false);
      });
    }
    return false;
  },
});

Template.passwordRecoveryComplete.events({

  'submit #new-password': function(e, t) {
    e.preventDefault();
    var pw = t.find('#new-password-password').value;
    if (pw && isValidPassword(pw)) {
      Session.set('loading', true);
      Accounts.resetPassword(this.token, pw, function(err) {
        if (err)
          Session.set('displayMessage', {
            title: 'Error',
            text: 'Password could not be reset',
            type: 'error'
          });
        else {
          Session.set('displayMessage', {
            title: 'Success',
            text: 'Password successfully reset!'
          });
        }
        Session.set('loading', false);
      });
    }
    return false;
  }
});
