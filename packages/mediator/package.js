Package.describe({
  summary: 'Mediator where you can subscribe to messages',
  version: '1.0.0',
  name: 'mediator'
});

Package.onUse(function (api) {

  var both = ['client', 'server'];

  api.use('tracker', 'client');
  api.use('underscore', 'client');
  api.addFiles('mediator.js', both);

  api.export('Mediator');
});