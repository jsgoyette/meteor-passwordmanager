Mediator = {

  channels: {},

  publish: function(name) {
    this.channels[name].args = _.toArray(arguments);
    return this.channels[name].deps.changed();
  },

  subscribe: function(name) {
    if (!this.channels[name]) {
      this.channels[name] = {
        deps: new Tracker.Dependency,
        args: null
      };
    }
    this.channels[name].deps.depend();
    return this.channels[name].args;
  }
};
