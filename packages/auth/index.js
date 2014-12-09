var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var isValidPassword = function(val) {
  if (val.length >= 6) {
    return true;
  } else {
    Mediator.publish('notification', {
      text: 'Password too short',
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
        Mediator.publish('notification', {
          text: err.reason || 'Unknown error',
          type: 'error'
        });
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
        Mediator.publish('notification', {
          text: "Account created. Verification email sent.\n\nPlease check your"
            + 'email to complete email address verification process.',
        });
        Router.go('/');
      } else {
        // inform the user that account creation failed
        // console.log(err);
        Mediator.publish('notification', {
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
          Mediator.publish('notification', {
            text: 'Could not send reset email',
            type: 'error'
          });
        else {
          Mediator.publish('notification', {
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
          Mediator.publish('notification', {
            text: 'Password could not be reset',
            type: 'error'
          });
        else {
          Mediator.publish('notification', {
            text: 'Password successfully reset!'
          });
        }
        Session.set('loading', false);
      });
    }
    return false;
  }
});
