
Accounts.emailTemplates.resetPassword.text = function(user, url) {
  url = url.replace('#/', '');
  return "Click this link to reset your password:\n\n" + url;
}

Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  url = url.replace('#/', '');
  return "Click this link to verify your email:\n\n" + url;
}

// on create user send verification email
Accounts.onCreateUser(function(options, user) {

  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() {
    Accounts.sendVerificationEmail(user._id);
  }, 2 * 1000);

  return user;
});


Meteor.startup(function() {

  // only allow accounts with a verified email address to log in
  Accounts.validateLoginAttempt(function(data) {

    // if not logging in, pass on through (needed for createUser not to fail)
    if (data.methodName != 'login') {
      return true;
    }
    else if (data.user && data.user.emails && (data.user.emails.length > 0)) {

      // return true if verified email, false otherwise
      var hasVerifiedEmail = _.find(
        data.user.emails,
        function(email) { return email.verified }
      );

      if (!hasVerifiedEmail) {
        throw new Meteor.Error(500, 'Account not verified. Check your email!');
      }

      console.log('loginAttemptVerifier');
      return hasVerifiedEmail && data.allowed;

    } else {
      throw new Meteor.Error(500, 'No user found');
      return false;
    }
  });

});