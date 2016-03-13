Package.describe({
  summary: 'password manager',
  version: '1.1.0',
  name: 'jsgoyette:passwords',
});

Package.onUse(function (api) {

  api.use([
    'underscore',
    'kadira:flow-router',
    'kadira:blaze-layout',
    'aldeed:autoform',
    'aldeed:collection2',
    'aldeed:simple-schema',
    'jsgoyette:mediator',
  ]);

  api.use([
    'templating',
    'reactive-var',
    'jsgoyette:aes',
    'sha',
  ], 'client');

  api.addFiles([
    'definitions.js',
    'collections.js',
    'routes.js',
  ]);

  api.addFiles('publications.js', 'server');

  api.addFiles([
    'views/password.html',
    'views/password.js',
    'views/passwordlist.html',
    'views/passwordlist.js',
  ], 'client');

  api.export('Passwords');
});
