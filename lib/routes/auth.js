var routes = [
  {
    'name': 'login',
    'opts': {
      path: '/login',
    }
  }, {
    'name': 'register',
    'opts': {
      path: '/register',
    }
  }, {
    'name': 'passwordRecovery',
    'opts': {
      path: '/reset',
    }
  }, {
    'name': 'passwordRecoveryComplete',
    'opts': {
      path: '/reset-password/:token',
      data: function () {
        return {
          token: this.params.token
        }
      }
    }
  }, {
    'name': 'verifyEmail',
    'opts': {
      path: '/verify-email/:token',
      action: function () {
        Meteor.call('verifyEmail', this.params.token, function(err) {
          console.log(err);
        });
        Session.set('displayMessage', {
          title: 'Email Verified.',
          text: 'Your account is now ready to go!'
        });
        Router.go('/');
      }
    }
  }, {
    'name': 'logout',
    'opts': {
      action: function () {
        Meteor.logout();
      }
    }
  }
];

Router.map(function() {
  _this = this;
  _.each(routes, function(r) {
    _this.route(r.name, r.opts);
  });
});

var BeforeHooks = {
  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      Router.go('/login');
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
