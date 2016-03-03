Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', function() {
  this.redirect('secure-create');
}, {
  name: 'home'
});

Router.openRoutes.push('secure-create');
Router.openRoutes.push('secure-retrieve');
Router.openRoutes.push('home');
