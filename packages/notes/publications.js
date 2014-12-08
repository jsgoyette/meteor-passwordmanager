Meteor.publish('notes', function(query, options) {

  query = query || {};
  query.userid = this.userId;
  query.deleted = false;

  return Notes.find(query, options);
});

// Meteor.publish('tags', function() {

//   var query = {
//     userid: this.userId,
//     deleted: false
//   };

//   var options = {
//     tags: 1,
//     _id: 0
//   };

//   return _.flatten(_.pluck(Notes.find(query, options).fetch(), "tags"));
// });