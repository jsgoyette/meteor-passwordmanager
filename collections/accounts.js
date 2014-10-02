if (Meteor.isServer) {

  Accounts.emailTemplates.resetPassword.text = function(user, url) {
    url = url.replace('#/', '');
    return "Click this link to reset your password:\n\n" + url;
  }

  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    url = url.replace('#/', '');
    return "Click this link to verify your email:\n\n" + url;
  }

}

Meteor.startup(function() {

  // only allow accounts with a verified email address to log in
  if (Meteor.isServer) {
    var loginAttemptVerifier = function(data) {
      // console.log(data);

      // if not logging in, pass on through (needed for createUser not to fail)
      if (data.methodName != 'login') {
        return true;
      }
      else if (data.user && data.user.emails && (data.user.emails.length > 0)) {

        // return true if verified email, false otherwise
        var found = _.find(
          data.user.emails,
          function(thisEmail) { return thisEmail.verified }
        );

        if (!found) {
          throw new Meteor.Error(500, 'Account not verified. Check your email!');
        }

        return found && data.allowed;

      } else {
        console.log("user has no registered emails.");
        return false;
      }
    }

    Accounts.validateLoginAttempt(loginAttemptVerifier);
  }
});