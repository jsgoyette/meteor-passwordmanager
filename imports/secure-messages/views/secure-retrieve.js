import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';

export const SecureMessageRetriever = function(opts) {

  // called without new
  if (! (this instanceof SecureMessageRetriever)) {
    return new SecureMessageRetriever(opts);
  }

  this._deps = {};
  this._deps['loading'] = new Tracker.Dependency;
  this._deps['message'] = new Tracker.Dependency;

  let id = opts.id || '';
  let key = opts.key || '';

  let message = '';
  let decryptedMessage = '';

  let loading = true;

  const decryptMessage = () => {
    decryptedMessage = message ? Aes.Ctr.decrypt(message, key, 256) : '';
  };

  Meteor.call('retrieveSecureMessage', id, (err, res) => {
    loading = false;
    this._deps['loading'].changed();
    if (res) {
      message = res.text;
      decryptMessage();
    }
    this._deps['message'].changed();
  });

  this.getLoading = () => {
    this._deps['loading'].depend();
    return loading;
  };

  this.getMessage = () => {
    this._deps['message'].depend();
    return message;
  };

  this.getDecryptedMessage = () => {
    this._deps['message'].depend();
    return decryptedMessage;
  };

};

let secureMessageRetriever = null;

Template.secureRetrieve.onCreated(function() {

  this.autorun(function() {
    const id = FlowRouter.getParam('_id');
    const key = FlowRouter.current().context.hash;

    if (!secureMessageRetriever && id) {
      secureMessageRetriever = SecureMessageRetriever({ id: id, key: key });
    }
  });
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
