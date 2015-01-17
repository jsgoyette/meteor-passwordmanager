Template.passwordlist.helpers({

  listData: function() {
    return {
      key: 'passwords',
      collection: Passwords,
      schema: CollectionSchema,
      fields: ListLayout.fields,
      options: ListLayout.defaultOptions
    };
  },

});
