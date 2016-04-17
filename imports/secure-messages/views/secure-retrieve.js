import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';

SecureMessageRetriever = function(opts) {

  // called without new
  if (! (this instanceof SecureMessageRetriever)) {
    return new SecureMessageRetriever(opts);
  }

  var self = this;

  self._deps = {};
  self._deps['loading'] = new Tracker.Dependency;
  self._deps['message'] = new Tracker.Dependency;

  var id = opts.id || '';
  var key = opts.key || '';

  var message = '';
  var decryptedMessage = '';

  var loading = true;

  var decryptMessage = () => {
    decryptedMessage = message ? Aes.Ctr.decrypt(message, key, 256) : '';
  };

  Meteor.call('retrieveSecureMessage', id, function(err, res) {
    loading = false;
    self._deps['loading'].changed();
    if (res) {
      message = res.text;
      decryptMessage();
    }
    self._deps['message'].changed();
  });

  self.getLoading = function() {
    self._deps['loading'].depend();
    return loading;
  };

  self.getMessage = function() {
    self._deps['message'].depend();
    return message;
  };

  self.getDecryptedMessage = function() {
    self._deps['message'].depend();
    return decryptedMessage;
  };

};

let secureMessageRetriever = '';

Template.secureRetrieve.onCreated(function() {

  var id = FlowRouter.getParam('_id');
  var key = FlowRouter.current().context.hash;

  if (!secureMessageRetriever)
    secureMessageRetriever = SecureMessageRetriever({ id: id, key: key });
});

Template.secureRetrieve.helpers({
  load() {
    return secureMessageRetriever.getLoading();
  },
  message() {
    return secureMessageRetriever.getMessage();
  },
  decryptedMessage() {
    return secureMessageRetriever.getDecryptedMessage();
  },
});
