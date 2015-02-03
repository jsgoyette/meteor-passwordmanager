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
      text: 'Contact was successfully created.',
      type: 'success',
      icon: 'glyphicon glyphicon-trash'
    });

    Router.go(this.path, {id: result});
  }
};

AutoForm.hooks({
  defaultRecord: {
    onError: onSubmitError,
    onSuccess: onSubmitSuccess,
  }
});
