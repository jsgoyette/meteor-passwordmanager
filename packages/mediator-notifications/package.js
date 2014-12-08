Package.describe({
  summary: 'server messaging and pnotify notifications',
  version: '1.0.0',
  name: 'jsgoyette:mediator-notifications',
});

Package.onUse(function (api) {

  var both = ['client', 'server'];

  api.use('jsgoyette:pnotify', 'client');
  api.use('mediator', 'client');
  api.use('underscore', 'client');

  api.addFiles('common.js', both);
  api.addFiles('server.js', 'server');
  api.addFiles('client.js', 'client');

});