Package.describe({
  summary: 'contacts',
  version: '1.0.0',
  name: 'jsgoyette:contacts',
});

Package.onUse(function (api) {

  var both = ['client', 'server'];

  api.use('tracker', both);
  api.use('underscore', both);
  api.use('iron:router', both);

  api.use('aldeed:autoform', both);
  api.use('aldeed:collection2', both);
  api.use('aldeed:simple-schema', both);

  api.use('templating', 'client');
  api.use('jsgoyette:mediator', both);
  api.use('jsgoyette:layouts', both);
  api.use('jsgoyette:aes', 'client');

  api.addFiles('definitions.js', both);
  api.addFiles('collections.js', both);
  api.addFiles('routes.js', both);
  api.addFiles('publications.js', 'server');

  api.addFiles('views/contactlist.html', 'client');
  api.addFiles('views/contactlist.js', 'client');
  api.addFiles('views/contact.html', 'client');
  api.addFiles('views/contact.js', 'client');

  api.export('Contacts', 'client');
});