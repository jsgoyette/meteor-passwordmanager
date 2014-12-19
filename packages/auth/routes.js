var routes = {

  'login': {
    path: '/login',
  },

  'register': {
    path: '/register',
  },

  'passwordRecovery': {
    path: '/reset',
  },

  'passwordRecoveryComplete': {
    path: '/reset-password/:token',
    data: function () {
      return {
        token: this.params.token
      }
    }
  },

  'verifyEmail': {
    path: '/verify-email/:token',
    action: function () {
      Meteor.call('verifyEmail', this.params.token, function(err) {
        if (!err) {
          Mediator.publish('notification', {
            title: 'Email Verified.',
            text: 'Your account is now ready to go!'
          });
        } else {
          console.log(err);
        }
      });
      Router.go('/');
    }
  },

  'logout': {
    action: function () {
      Meteor.logout();
    }
  }
};

Router.map(function() {
  _.each(routes, function(opts, name) {
    this.route(name, opts);
  }, this);
});

var BeforeHooks = {
  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      this.render('login');
    } else {
      this.next();
    }
  },
  alreadyLoggedIn: function() {
    if (Meteor.user()) {
      Router.go('/');
    } else {
      this.next();
    }
  },
}

Router.onBeforeAction(BeforeHooks.isLoggedIn, {
  except: ['login', 'register', 'passwordRecovery', 'passwordRecoveryComplete', 'verifyEmail']
});

Router.onBeforeAction(BeforeHooks.alreadyLoggedIn, {
  only: ['login', 'register', 'passwordRecovery', 'passwordRecoveryComplete', 'verifyEmail']
});
