Template.passwordlist.helpers({

  listData: function() {

    var labels = _.object(
      _.keys(CollectionSchema),
      _.pluck(CollectionSchema, 'label')
    );

    return {
      key: 'passwords',
      collection: Passwords,
      labels: labels,
      fields: ListLayout.fields,
      controller: Layouts.Controllers.list({
        key: 'passwords',
        options: ListLayout.defaultOptions
      })
    };
  },

});
