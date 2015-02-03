Template.defaultList.helpers({

  listData: function() {

    var defs = this.defs || {};
    var listLayout = defs.layouts && defs.layouts.list;

    return {
      key: defs.collection,
      collection: Collections[defs.collection],
      schema: defs.fields,
      fields: listLayout.fields,
      options: listLayout.defaultOptions
    };
  },

});
