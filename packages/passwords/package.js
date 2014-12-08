Package.describe({
  summary: 'password manager',
  version: '1.0.0',
  name: 'jsgoyette:passwords',
});

Package.onUse(function (api) {

  var both = ['client', 'server'];

  api.use('mediator', both);
  api.use('underscore', both);
  api.use('iron:router', both);
  api.use('templating', 'client');
  api.use('jsgoyette:aes', 'client');

  api.addFiles('routes.js', both);
  api.addFiles('collections.js', both);
  api.addFiles('publications.js', 'server');

  api.addFiles('views/password.html', 'client');
  api.addFiles('views/password.js', 'client');
  api.addFiles('views/passwordlist.html', 'client');
  api.addFiles('views/passwordlist.js', 'client');
  api.addFiles('views/passwordnew.html', 'client');
  api.addFiles('views/passwordnew.js', 'client');

  // api.export('PNotify', 'client');
});