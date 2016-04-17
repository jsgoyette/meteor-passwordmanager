import { Meteor } from 'meteor/meteor';
import { SecureMessages } from './collections.js';

Meteor.methods({

  retrieveSecureMessage: function(id) {
    var message = SecureMessages.findOne({ _id: id });
    // delete it if it exists
    if (message) {
      SecureMessages.remove({ _id: id });
    }
    return message;
  },

  createSecureMessage: function(text) {
    if (!text) return null;
    var _id = SecureMessages.insert({
      text: text,
      created: new Date().getTime()
    });
    return _id;
  },

});
