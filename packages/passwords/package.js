Package.describe({
  summary: 'password manager',
  version: '1.0.0',
  name: 'jsgoyette:passwords',
});

Package.onUse(function (api) {

  api.use('underscore');
  api.use('iron:router');
  api.use('aldeed:autoform');
  api.use('aldeed:collection2');
  api.use('aldeed:simple-schema');
  api.use('jsgoyette:mediator');

  api.use('templating', 'client');
  api.use('reactive-var', 'client');
  api.use('sha', 'client');
  api.use('jsgoyette:aes', 'client');

  api.addFiles('definitions.js');
  api.addFiles('collections.js');
  api.addFiles('routes.js');
  api.addFiles('publications.js', 'server');

  api.addFiles('views/password.html', 'client');
  api.addFiles('views/password.js', 'client');
  api.addFiles('views/passwordlist.html', 'client');
  api.addFiles('views/passwordlist.js', 'client');

  api.export('Passwords');
});
