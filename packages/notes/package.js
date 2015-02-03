Package.describe({
  summary: 'notes tool based on simplenote',
  version: '1.0.0',
  name: 'jsgoyette:notes',
});

Package.onUse(function (api) {

  api.use('underscore');
  api.use('iron:router');
  api.use('templating', 'client');
  api.use('jsgoyette:mediator');
  api.use('jsgoyette:layouts');

  api.addFiles('routes.js');
  api.addFiles('collections.js');
  api.addFiles('publications.js', 'server');

  api.addFiles('views/note.html', 'client');
  api.addFiles('views/note.js', 'client');
  api.addFiles('views/notelist.html', 'client');
  api.addFiles('views/notelist.js', 'client');
  api.addFiles('views/notenew.html', 'client');
  api.addFiles('views/notenew.js', 'client');

});