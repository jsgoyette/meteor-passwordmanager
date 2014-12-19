Template.passwordlist.helpers({
  passwordlist: function() {
    return Passwords.find(getFilter(), {sort: {nickname: 1}});
  },

  filter: function() {
    return Session.get('filter');
  },
});

var getFilter = function() {
  if (Session.equals('filter', undefined)) {
    return {};
  }
  return {
    nickname: {
      $regex: Session.get('filter')
    }
  }
};

Template.passwordlist.rendered = function () {
  $('#filter').focus();
};

Template.passwordlist.events({

  'keyup #filter': function (e) {

    if (e.keyCode == 13) {
      var url = $('.password').first().prop('href');
      Router.go(url);
    }
    else if (e.keyCode == 27) {
      Session.set('filter', '');
    }
    else {
      Session.set('filter', $('#filter').val());
    }

  },

});

