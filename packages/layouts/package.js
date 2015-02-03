Package.describe({
  summary: 'layouts package',
  version: '1.0.0',
  name: 'jsgoyette:layouts',
});

Package.onUse(function (api) {

  api.use('tracker');
  api.use('underscore');
  api.use('templating', 'client');

  api.use('aldeed:autoform');
  api.use('aldeed:collection2');
  api.use('aldeed:simple-schema');

  api.use('jsgoyette:mediator');
  api.use('jsgoyette:spin', 'client');

  api.addFiles('layouts/404.html', 'client');
  api.addFiles('layouts/404.js', 'client');

  api.addFiles('layouts/list.html', 'client');
  api.addFiles('layouts/list.js', 'client');

  api.addFiles('layouts/record.html', 'client');
  api.addFiles('layouts/record.js', 'client');

  api.addFiles('layouts/spinner.html', 'client');
  api.addFiles('layouts/spinner.js', 'client');

  api.addFiles('layouts/loading.html', 'client');
  api.addFiles('layouts/loading.js', 'client');

  api.addFiles('index.js', 'client');

  api.export('Layouts', 'client');
});