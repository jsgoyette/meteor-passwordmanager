Meteor.methods({

  'sendVerification': function () {
    Accounts.sendVerificationEmail(Meteor.userId());
  },

});
