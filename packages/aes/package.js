Package.describe({
  summary: 'aes wrapper package',
  version: '1.0.0',
  name: 'jsgoyette:aes',
});

Package.onUse(function (api) {

  var both = ['client', 'server'];

  api.addFiles('aes.js', both);

  api.export('Sha256', both);
  api.export('Utf8', both);
  api.export('Aes', both);
  api.export('Base64', both);

});