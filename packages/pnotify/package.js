Package.describe({
  summary: 'pnotify wrapper package',
  version: '1.0.0',
  name: 'jsgoyette:pnotify',
});

Package.onUse(function (api) {

  api.addFiles('pnotify.custom.css', 'client');
  api.addFiles('pnotify.user.css', 'client');
  api.addFiles('pnotify.custom.js', 'client');

  api.export('PNotify', 'client');
});