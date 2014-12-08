// only publish the users collection to admin users to allow for reporting
/*Meteor.publish("userData", function () {
    if (Meteor.call('loggedInIsAdmin')) {
        return Meteor.users.find({}, { fields: { 'username': true } });
    }
    else {
        this.ready();
    }
});*/