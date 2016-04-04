Package.describe({
  summary: 'app base',
  version: '1.1.0',
  name: 'app',
});

Package.onUse(function (api) {

  api.use([
    'underscore',
    'jsgoyette:mediator',
    'jsgoyette:layouts',
  ]);

  api.use([
    'kadira:flow-router',
    'kadira:blaze-layout',
    'templating',
    'jsgoyette:spin',
  ], 'client');

  api.addFiles([
    'layouts/default.html',
    'layouts/default.js',
    'layouts/footer.html',
    'layouts/nav.html',
    'layouts/nav.js',
    'routes.js',
  ], 'client')

});
