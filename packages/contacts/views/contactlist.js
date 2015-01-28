Template.contactlist.helpers({

  listData: function() {
    return {
      key: 'contacts',
      collection: Contacts,
      schema: CollectionSchema,
      fields: LayoutDefinitions.list.fields,
      options: LayoutDefinitions.list.defaultOptions
    };
  },

});
