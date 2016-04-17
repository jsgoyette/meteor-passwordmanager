import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';

SecureMessageBuilder = function() {

  // called without new
  if (! (this instanceof SecureMessageBuilder)) {
    return new SecureMessageBuilder();
  }

  var self = this;

  self._deps = {};
  self._deps['message'] = new Tracker.Dependency;

  var _id = '';
  var key = '';
  var message = '';
  var encryptedMessage = '';

  self.getMessageDetails = function() {
    self._deps['message'].depend();
    return !_id ? null : {
      _id: _id,
      key: key,
    };
  };

  self.setMessage = function(newMessage) {

    message = newMessage;

    if (message) {

      key = Random.secret(30);
      encryptedMessage = Aes.Ctr.encrypt(message, key, 256);

      Meteor.call('createSecureMessage', encryptedMessage, function(err, res) {
        _id = res;
        self._deps['message'].changed();
      });

    } else {

      key = _id = encryptedMessage = '';
      self._deps['message'].changed();

    }
  };

};


Template.secureCreate.onCreated(function() {
  var template = Template.instance();
  template.data.secureMessageBuilder = SecureMessageBuilder();
});

Template.secureCreate.helpers({

  output() {
    return this.secureMessageBuilder.getMessageDetails();
  },

  urlFor(path, view) {

    var hashBang, query, ref;
    if (view == null) {
      view = {
        hash: {}
      };
    }
    if (!path) {
      throw new Error('no path defined');
    }
    if (!view.hash) {
      view = {
        hash: view
      };
    }

    if (((ref = path.hash) != null ? ref.route : void 0) != null) {
      view = path;
      path = view.hash.route;
      delete view.hash.route;
    }

    query = view.hash.query ? FlowRouter._qs.parse(view.hash.query) : {};
    hashBang = view.hash.hash ? view.hash.hash : '';
    relativePath = FlowRouter.path(path, view.hash, query) + (hashBang ? "#" + hashBang : '');

    return Meteor.absoluteUrl(relativePath.substr(1));
  }

});

Template.secureCreate.events({

  'submit #enc-form'(e, template) {
    e.preventDefault();
    var message = $('#message').val();
    if (message) {
      this.secureMessageBuilder.setMessage(message);
    }
  },

  'click #new'(e, template) {
    this.secureMessageBuilder.setMessage('');
  },

  'focus .select-all'(e, template) {
    $(e.target).select();
  },

});
