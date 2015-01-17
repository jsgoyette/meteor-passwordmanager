Package.describe({
  summary: 'layouts package',
  version: '1.0.0',
  name: 'layouts',
});

Package.onUse(function (api) {

  var both = ['client', 'server'];

  api.use('tracker', both);
  api.use('mediator', both);
  api.use('underscore', both);
  api.use('templating', 'client');
  api.use('aldeed:autoform', both);
  api.use('aldeed:collection2', both);
  api.use('aldeed:simple-schema', both);
  api.use('spin', 'client');

  api.addFiles('layouts/list.html', 'client');
  api.addFiles('layouts/list.js', 'client');

  api.addFiles('layouts/spinner.html', 'client');
  api.addFiles('layouts/spinner.js', 'client');

  api.addFiles('index.js', 'client');

  api.export('Layouts', 'client');
});