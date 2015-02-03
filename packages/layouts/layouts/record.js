Template.record.created = function() {
  // console.log(this);
};

Template.record.helpers({
  'fields': function() {
    return this.fields || [];
  },
  'collection': function() {
    return this.collection || null;
  },
  'schema': function() {
    return this.schema || null;
  },
  'formType': function() {
    return this.record._id ? 'update' : 'insert';
  },
});

Template.record.events({

  'click #confirmDelete': function (e, template) {
    if (confirm('Do you really want to delete this record?')) {
      this.collection.update({ _id: this.record._id }, { $set: {deleted: true} }, function (err, affected) {
        Router.go(this.defs.path + 'list');
      });
    }
  }

});

var onSubmitError = function (operation, error, template) {
  Mediator.publish('notification', {
    text: error,
    type: 'error',
    icon: 'glyphicon glyphicon-info-sign'
  });
};

var onSubmitSuccess = function (operation, result, template) {

  if (operation == 'update') {

    var doc = template.data.doc;

    if (doc && doc.deleted) {
      Mediator.publish('notification', {
        text: doc.name + ' was successfully deleted.',
        type: 'info',
        icon: 'glyphicon glyphicon-trash'
      });
    }
    else if (doc) {
      Mediator.publish('notification', {
        text: doc.name + ' was successfully saved!',
        type: 'success',
        icon: 'glyphicon glyphicon-ok-sign'
      });
    }
  }
  else if (operation == 'insert') {

    Mediator.publish('notification', {
      text: 'Record was successfully created.',
      type: 'success',
      icon: 'glyphicon glyphicon-trash'
    });

    Router.go(this.path, {id: result});
  }
};

AutoForm.hooks({
  recordForm: {
    onError: onSubmitError,
    onSuccess: onSubmitSuccess,
  }
});
