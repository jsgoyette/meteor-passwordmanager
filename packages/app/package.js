Package.describe({
  summary: 'app base',
  version: '1.1.0',
  name: 'app',
});

Package.onUse(function (api) {

  api.use('underscore');
  api.use('kadira:flow-router');
  api.use('kadira:blaze-layout');
  api.use('jsgoyette:mediator');
  api.use('jsgoyette:layouts');

  api.use('templating', 'client');
  api.use('jsgoyette:spin', 'client');

  api.addFiles('layouts/default.html', 'client');
  api.addFiles('layouts/footer.html', 'client');
  api.addFiles('layouts/nav.html', 'client');
  api.addFiles('layouts/nav.js', 'client');

  api.addFiles('routes.js');
});
