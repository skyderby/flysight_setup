module.exports = Backbone.View.extend({

  el: '#wrapper',

  initialize: function() {
    this.render();
    this.on('show-track', this.showTrack.bind(this));
    this.on('show-config', this.showConfig.bind(this));
    this.on('show-flysight', this.showFlysight.bind(this));
  },

  render: function() {
    var sidebar = new Skyderby.views.Sidebar({el: '#sidebar-wrapper'});
    sidebar.render();
  },

  showTrack: function(data) {
    var track = new Skyderby.models.Track({points: data});
    var trackShowView = new Skyderby.views.TrackShow({
      el: '#page-wrapper',
      model: track
    });

    trackShowView.render();
  },

  showConfig: function(data) {
    var config = new Skyderby.models.FlysightConfig(data);
    var flysightConfigView = new Skyderby.views.FlysightConfig({
      el: '#page-wrapper',
      model: config
    });

    flysightConfigView.render();
  },

  showFlysight: function(data) {
    var flysight = new Skyderby.models.Flysight({data: data});
    var flysightShowView = new Skyderby.views.FlysightShow({
      el: '#page-wrapper',
      model: flysight
    });

    flysightShowView.render();
  }
});
