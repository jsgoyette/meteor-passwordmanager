Notes = new Meteor.Collection('notes');

Notes.allow({

  'update': function (userId, doc) {
    /* user and doc checks ,
    return true to allow insert */
    return userId == doc.userid;
  },

  'insert': function (userId, doc) {
    return true;
  }

});

// if (Meteor.isServer) {
//   Messages.after.update(function (userId, doc, fieldNames, modifier, options) {
//     console.log(userId);
//     console.log(doc);
//     console.log(fieldNames);
//     console.log(modifier);
//     console.log(options);
//   });
// }