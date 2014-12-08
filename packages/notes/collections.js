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
