Package.describe({
  summary: 'custom auth pages',
  version: '1.0.0',
  name: 'jsgoyette:auth',
});

Package.onUse(function (api) {

  var both = ['client', 'server'];

  api.use('accounts-base');
  api.use('accounts-password');
  api.use('iron:router');
  api.use('underscore');
  api.use('templating');

  api.addFiles('index.html', 'client');
  api.addFiles('index.js', 'client');
  api.addFiles('accounts.js', 'server');
  api.addFiles('methods.js', 'server');
  api.addFiles('routes.js', both);

});