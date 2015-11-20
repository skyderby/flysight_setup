var template_str = fs.readFileSync('./browser/templates/flysight-config.ejs', 'utf8');

module.exports = Backbone.View.extend({

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  template: ejs.compile(template_str)

});
