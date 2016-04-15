import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PasswordsSchema } from './schema.js';

export const Passwords = new Meteor.Collection('passwords');

Passwords.attachSchema(new SimpleSchema(PasswordsSchema));

Passwords.allow({

  'update': function (userId, doc) {
    // return true to allow insert
    return userId == doc.userid;
  },

  'insert': function (userId, doc) {
    return true;
  }

});
