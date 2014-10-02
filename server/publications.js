Meteor.publish('passwords', function(query, options) {

  query = query || {};
  query.userid = this.userId;
  query.deleted = false;

  return Passwords.find(query, options);
});


// only publish the users collection to admin users to allow for reporting
/*Meteor.publish("userData", function () {
    if (Meteor.call('loggedInIsAdmin')) {
        return Meteor.users.find({}, { fields: { 'username': true } });
    }
    else {
        this.ready();
    }
});*/