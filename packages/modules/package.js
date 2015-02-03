Package.describe({
  summary: 'modules',
  version: '1.0.0',
  name: 'jsgoyette:modules',
});

Package.onUse(function (api) {

  api.use('tracker');
  api.use('underscore');
  api.use('iron:router');

  api.use('aldeed:autoform');
  api.use('aldeed:collection2');
  api.use('aldeed:simple-schema');
  api.use('aldeed:template-extension');

  api.use('templating', 'client');
  api.use('jsgoyette:mediator');
  api.use('jsgoyette:layouts');

  api.addFiles('modules.js');
  api.addFiles('collections.js');
  api.addFiles('publications.js', 'server');
  api.addFiles('routes.js');

  api.addFiles('views/default-record.html', 'client');
  api.addFiles('views/default-record.js', 'client');
  api.addFiles('views/default-list.html', 'client');
  api.addFiles('views/default-list.js', 'client');

  api.export('Modules');
});