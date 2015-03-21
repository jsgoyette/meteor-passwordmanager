Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', function() {
  this.redirect('passwordlist');
});

Router.openRoutes.push('secure-create');
Router.openRoutes.push('secure-retrieve');