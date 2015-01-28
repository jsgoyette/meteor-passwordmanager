Template.contact.helpers({
  'recordLayoutDefs': function () {
    return LayoutDefinitions.record;
  }
});

Template.contactnew.helpers({
  'recordLayoutDefs': function () {
    return LayoutDefinitions.record;
  }
});

Template.contact.events({

  'click #confirmDelete': function (e, template) {
    if (confirm('Do you really want to delete this record?')) {
      Contacts.update({ _id: this._id }, { $set: {deleted: true} }, function (err, affected) {
        Router.go('contactlist');
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
      text: 'Contact was successfully created.',
      type: 'success',
      icon: 'glyphicon glyphicon-trash'
    });

    Router.go('contact', {id: result});
  }
};

AutoForm.hooks({

  contactForm: {
    onError: onSubmitError,
    onSuccess: onSubmitSuccess,
  },

  contactNewForm: {
    onError: onSubmitError,
    onSuccess: onSubmitSuccess,
  }
});
