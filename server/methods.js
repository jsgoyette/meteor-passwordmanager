Meteor.methods({

  'sendEmail': function (to, subject, html) {
    if (!to || !subject) return;
    Email.send({
      from: 'info@ind.li',
      to: to,
      subject: subject,
      html: html,
    });
  },

  'sendVerification': function () {
    Accounts.sendVerificationEmail(Meteor.userId());
  },

});
