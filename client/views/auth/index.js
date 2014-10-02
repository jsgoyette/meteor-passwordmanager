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
    // console.log($('#login-password').val());
    return false;
  },
  'submit #login-form' : function(e, t) {
    e.preventDefault();

    // retrieve the input field values
    var email = t.find('#login-email').value,
      password = t.find('#login-password').value;

    // TODO: Trim and validate fields here....

    // If validation passes, supply the appropriate fields to the
    // Meteor.loginWithPassword() function.
    Meteor.loginWithPassword(email, password, function(err) {
      // console.log(err);
      if (err) {
        // Inform user that login attempt failed.
        Session.set('displayMessage', {
          title: 'Login error',
          text: err.reason || 'Unknown error.',
          type: 'error'
        });
      } else {
        // The user has been logged in.
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

    Meteor.call('createUser', {email: email, username : username, password : password}, function(err) {
      if (!err) {
        Meteor.call('sendVerification');
        // Success, account created...clear messages and redirect
        Session.set('displayMessage', {
          title: 'Welcome!',
          text: "Account created. Verification email sent.\n\nPlease check your email to complete email address verification process.",
          type: 'success'
        });
        Router.go('/');
      } else {
        // Inform the user that account creation failed
        console.log(err);
        Session.set('displayMessage', {
          title: 'Error creating account',
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
    // if (email && isEmail(email)) {
      Session.set('loading', true);
      Accounts.forgotPassword({email: email}, function (err) {
        if (err)
          Session.set('displayMessage', {
            title: 'Error',
            text: 'Password reset error',
            type: 'error'
          });
        else {
          Session.set('displayMessage', {
            title: 'Email Sent.',
            text: 'Please check your email.'
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
            text: 'Password reset error',
            type: 'error'
          });
        else {
          Session.set('displayMessage', {
            title: 'Success',
            text: 'Password successfully reset'
          });
        }
        Session.set('loading', false);
      });
    }
    return false;
  }
});
