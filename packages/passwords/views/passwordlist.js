Template.passwordlist.helpers({

  listData: function() {
    return {
      key: 'passwords',
      collection: Passwords,
      schema: CollectionSchema,
      fields: ListLayout.fields,
      controller: Layouts.Controllers.list({
        key: 'passwords',
        options: ListLayout.defaultOptions
      })
    };
  },

});
