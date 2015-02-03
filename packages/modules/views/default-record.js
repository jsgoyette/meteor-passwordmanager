Template.defaultRecord.helpers({

  recordData: function() {

    var defs = this.defs || {};
    var recordLayout = defs.layouts && defs.layouts.record;

    return {
      collection: Collections[defs.collection],
      schema: defs.fields,
      fields: recordLayout.fields,
      record: this.record,
    }
  },

});
