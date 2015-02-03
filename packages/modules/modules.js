Modules = {};

Modules.Defs = new Meteor.Collection('moduledefs');

Modules.Constants = Constants = {
  'String': String,
  'Object': Object,
  'Boolean': Boolean,
  'Number': Number,
  'Date': Date,
};

Modules.AutoValueFunctions = AutoValueFunctions = {};

AutoValueFunctions.fullName = function () {
  var firstname = this.field('firstname');
  var lastname = this.field('lastname');
  return firstname.value + ' ' + lastname.value;
};
