var str = fs.readFileSync('./browser/templates/sidebar.ejs', 'utf8');

module.exports = Backbone.View.extend({

  events: {
    'click a.open-track-file': 'openTrackFile',
    'click a.open-config': 'openConfig'
  },

  render: function() {
    this.$el.html(this.template());
  },

  openTrackFile: function(e) {
    e.preventDefault();
    ipc.send('open-track-file');
  },

  openConfig: function(e) {
    e.preventDefault();
    ipc.send('configure-flysight');
  },

  template: ejs.compile(str)

});
