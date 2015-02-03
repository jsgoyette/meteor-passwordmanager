Meteor.publish('moduledefs', function() {
  return [Modules.Defs.find()];
});

var addQueryDefaults = function(query) {
  query = query || {};
  return {
    $and: [
      { deleted: false },
      query
    ]
  };
};

/**
 * [setupPublications - load module publications]
 * @param  {[object]} module [moduledefs object]
 */
var setupPublications = function(module) {

  var collection = Collections[module.collection];

  collection.allow({
    'update': function (userId, doc) {
      return true;
    },
    'insert': function (userId, doc) {
      return true;
    }
  });

  Meteor.publish(module.collection, function(query, options) {
    query = addQueryDefaults(query);
    return [collection.find(query, options)];
  });

  // set up filterTotal method for list view
  var method = {};
  var methodName = module.collection + 'FilteredTotal';

  method[methodName] = function(query) {
    query = addQueryDefaults(query);
    return collection && collection.find(query).count();
  };

  Meteor.methods(method);

};

Meteor.methods({
  'load-module-publications': function() {
    Modules.Defs.find().forEach(function(module) {
      setupPublications(module);
    });
  }
});

Meteor.startup(function() {
  Meteor.call('load-module-publications');
});
