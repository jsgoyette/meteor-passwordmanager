Modules.Collections = Collections = {};

/**
 * [buildSchema - transform db schema to collections2 compatible]
 * @param  {[object]} fields [db fields object]
 * @return {[object]}        [updated fields object]
 */
var buildSchema = function(fields) {

  _.each(fields, function(field, idx) {

    // set type to String, Number, etc.
    fields[idx].type = Constants[field.type] || String;

    // set autoValue functions
    if (AutoValueFunctions[field.autoValue]) {
      fields[idx].autoValue = AutoValueFunctions[field.autoValue];
    }
  });

  fields.deleted = {
    type: Boolean,
    defaultValue: false
  }

  return fields;
};

/**
 * [processModules - instantiate module collections]
 */
var processModules = function() {

  Modules.Defs.find().forEach(function(module) {

    // grab or create collection
    var collection = Modules.Collections[module.collection] || new Meteor.Collection(module.collection);

    // transform db schema to collections2
    var schema = buildSchema(module.fields);

    // attach schema
    collection.attachSchema(new SimpleSchema(schema));

    // (re)define module collection
    Modules.Collections[module.collection] = collection;
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    processModules();
  });
  Meteor.methods({
    'load-module-schema': function() {
      processModules();
    }
  });
}
else {
  Meteor.startup(function() {
    Tracker.autorun(function() {
      processModules();
    });
  });
}
