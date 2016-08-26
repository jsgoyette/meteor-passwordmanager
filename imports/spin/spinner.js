import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Spinner } from 'spin.js';

Template.spinner.onRendered(function() {

  const options = _.extend({}, defaultSpinner.options, this.data);

  this.spinner = new Spinner(options);

  Meteor.setTimeout(() => {
    this.spinner.spin(_this.firstNode);
  }, options.delay || 0);

});

Template.spinner.onDestroyed(function() {
  this.spinner && this.spinner.stop();
});

let defaultSpinner = {
  options: {
    lines: 13, // The number of lines to draw
    length: 8, // The length of each line
    width: 3, // The line thickness
    radius: 12, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000', // #rgb or #rrggbb
    speed: 1.2, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent in px
    left: '50%' // Left position relative to parent in px
  }
};
