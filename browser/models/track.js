module.exports = Backbone.Model.extend({

  defaults: {
    points: [],
    logger: 'flysight'
  },

  initialize: function(opts) {
    this.points = new Skyderby.collections.Points();
    this.points.set(this.get('points'));
  }

});
