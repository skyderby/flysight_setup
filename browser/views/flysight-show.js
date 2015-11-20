var template_str = fs.readFileSync('./browser/templates/flysight-show.ejs', 'utf8');

module.exports = Backbone.View.extend({

  initialize: function() {
  },

  render: function() {
    this.$el.html(this.template());
  },

  template: ejs.compile(template_str)

});
