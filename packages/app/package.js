Package.describe({
  summary: 'app base',
  version: '1.0.0',
  name: 'app',
});

Package.onUse(function (api) {

  var both = ['client', 'server'];

  api.use('mediator', both);
  api.use('underscore', both);
  api.use('iron:router', both);
  api.use('templating', 'client');
  api.use('spin', 'client');
  api.use('layouts', 'client');

  api.addFiles('layouts/default.html', 'client');
  api.addFiles('layouts/default.js', 'client');

  api.addFiles('layouts/footer.html', 'client');
  api.addFiles('layouts/nav.html', 'client');

  api.addFiles('routes.js', both);
});