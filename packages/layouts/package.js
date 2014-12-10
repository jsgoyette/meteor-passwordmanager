Package.describe({
  summary: 'layouts package',
  version: '1.0.0',
  name: 'layouts',
});

Package.onUse(function (api) {

  var both = ['client', 'server'];

  api.use('mediator', both);
  api.use('underscore', both);
  api.use('templating', 'client');
  api.use('spin', 'client');

  api.addFiles('layouts/spinner.html', 'client');
  api.addFiles('layouts/spinner.js', 'client');

  api.addFiles('index.js', 'client');

  api.export('Layouts', 'client');
});