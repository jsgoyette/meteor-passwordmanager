import { Meteor } from 'meteor/meteor';
import { Passwords } from './collections.js';

var makeQuery = function(query, userid) {
  query = query || {};
  return {
    $and: [
      { deleted: false },
      { userid: userid },
      query
    ]
  };
};

Meteor.publish('passwords', function(query, options) {
  query = makeQuery(query, this.userId);
  return [Passwords.find(query, options)];
});

Meteor.methods({
  'passwordsFilteredTotal': function (query) {
    query = makeQuery(query, this.userId);
    return Passwords.find(query).count();
  }
});
