Package.describe({
  summary: 'notes tool based on simplenote',
  version: '1.0.0',
  name: 'jsgoyette:notes',
});

Package.onUse(function (api) {

  var both = ['client', 'server'];

  api.use('mediator', both);
  api.use('underscore', both);
  api.use('iron:router', both);
  api.use('templating', 'client');

  api.addFiles('routes.js', both);
  api.addFiles('collections.js', both);
  api.addFiles('publications.js', 'server');

  api.addFiles('views/note.html', 'client');
  api.addFiles('views/note.js', 'client');
  api.addFiles('views/notelist.html', 'client');
  api.addFiles('views/notelist.js', 'client');
  api.addFiles('views/notenew.html', 'client');
  api.addFiles('views/notenew.js', 'client');

});