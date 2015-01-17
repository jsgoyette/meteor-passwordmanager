var makeQuery = function(query) {
  query = query || {};
  return {
    $and: [
      { deleted: false },
      query
    ]
  };
};

Meteor.publish('contacts', function(query, options) {
  query = makeQuery(query);
  return [Contacts.find(query, options)];
});

Meteor.methods({
  'contactsFilteredTotal': function (query) {
    query = makeQuery(query);
    return Contacts.find(query).count();
  }
});
