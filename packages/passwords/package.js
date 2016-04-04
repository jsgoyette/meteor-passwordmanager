Package.describe({
  summary: 'password manager',
  version: '1.1.0',
  name: 'jsgoyette:passwords',
});

Package.onUse(function (api) {

  api.use([
    'underscore',
    'aldeed:autoform',
    'aldeed:collection2',
    'aldeed:simple-schema',
    'jsgoyette:mediator',
  ]);

  api.use([
    'sha',
    'templating',
    'reactive-var',
    'kadira:flow-router',
    'kadira:blaze-layout',
    'jsgoyette:aes',
  ], 'client');

  api.addFiles([
    'definitions.js',
    'collections.js',
  ]);

  api.addFiles('publications.js', 'server');

  api.addFiles([
    'routes.js',
    'views/password.html',
    'views/password.js',
    'views/passwordlist.html',
    'views/passwordlist.js',
  ], 'client');

  api.export('Passwords');
});
