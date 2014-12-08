Accounts.emailTemplates.from = 'ind.li <no-reply@ind.li>';
Accounts.emailTemplates.siteName = 'ind.li';

Meteor.startup(function () {
  process.env.MAIL_URL="smtp://jsgoyette%40gmail.com:xyzabc123@smtp.gmail.com:465";
});
