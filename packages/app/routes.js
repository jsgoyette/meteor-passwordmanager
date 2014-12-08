Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.redirect('passwordlist');
});