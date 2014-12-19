Meteor.publish('passwords', function(query, options) {

  query = query || {};
  query.userid = this.userId;
  query.deleted = false;

  return [
    Passwords.find(query, options)
  ];
});
