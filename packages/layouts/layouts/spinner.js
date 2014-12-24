Template.spinnerDefault.helpers({
  layoutOptions: function () {
    return _.extend({
      color: '#bbb',
    }, this);
  },
});

Template.spinnerLarge.helpers({
  layoutOptions: function (a) {
    return _.extend({
      length: 12,
      width: 6,
      radius: 16,
      color: '#bbb',
      top: '25%',
      left: '50%',
      delay: 200
    }, this);
  },
});

Template.spinnerSmall.helpers({
  layoutOptions: function () {
    return _.extend({
      length: 6,
      width: 2,
      radius: 5,
      color: '#bbb',
    }, this);
  },
});
