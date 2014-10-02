Template.passwordlist.helpers({
    // passwordlist: function() {
    //     return Passwords.find({}, {sort: {nickname: 1}}).fetch();
    // }

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

Template.passwordlist.filter = function() {
  return getFilter();
};

Template.passwordlist.passwordlist = function () {
  return Passwords.find(getFilter(), {sort: {nickname: 1}});
};

Template.passwordlist.rendered = function () {
  $('#filter').focus();
  if (!$('#filter').val()) {
    Session.set('filter', '');
  }
};

Template.passwordlist.events({

  'keyup #filter': function (e) {
    if (e.keyCode == 13) {
      var url = $('.password').first().parent().prop('href');
      Router.go(url);
    }
    Session.set('filter', $('#filter').val());
  },

});

