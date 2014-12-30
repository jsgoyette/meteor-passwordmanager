var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var isValidPassword = function(val) {
  if (val.length >= 6) {
    return true;
  }
  else {
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

  'submit form' : function(e, t) {
    e.preventDefault();

    // retrieve the input field values
    var email = t.find('#login-email').value;
    var password = t.find('#login-password').value;

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

  'submit form' : function(e, t) {
    e.preventDefault();

    var email = t.find('#account-email').value;
    var username = t.find('#account-username').value;
    var password = t.find('#account-password').value;

    // Trim and validate the input
    email = trimInput(email);
    if (!isValidPassword(password)) return false;

    var newUser = {
      email: email,
      username : username,
      password : password
    };

    Meteor.call('createUser', newUser, function(err) {
      if (err) {
        // inform the user that account creation failed
        Mediator.publish('notification', {
          text: err.reason,
          type: 'error'
        });
      }
      else {
        // success, account created
        Mediator.publish('notification', {
          text: "Account created. Verification email sent.\n\nPlease check your"
            + 'email to complete email address verification process.',
        });
        Router.go('/');
      }

    });

    return false;
  }
});

Template.passwordRecovery.events({

  'submit form' : function(e, t) {
    e.preventDefault();

    var email = t.find('#recovery-email').value;
    email = trimInput(email);

    if (!email) return false;

    Accounts.forgotPassword({email: email}, function (err) {
      if (err) {
        Mediator.publish('notification', {
          text: 'Could not send reset email',
          type: 'error'
        });
      }
      else {
        Mediator.publish('notification', {
          text: 'Please check your email'
        });
      }
    });

    return false;
  },
});

Template.passwordRecoveryComplete.events({

  'submit form': function(e, t) {
    e.preventDefault();

    var pw = t.find('#new-password-password').value;
    var repeat = t.find('#new-password-repeat').value;

    if (!isValidPassword(pw)) return false;

    if (pw != repeat) {
      Mediator.publish('notification', {
        text: 'Passwords do not match',
        type: 'error'
      });
      return false;
    }

    Accounts.resetPassword(this.token, pw, function(err) {
      if (err) {
        Mediator.publish('notification', {
          text: 'Password could not be reset',
          type: 'error'
        });
      }
      else {
        Mediator.publish('notification', {
          text: 'Password successfully reset!'
        });
      }
    });

    return false;
  }
});
