var template_str = fs.readFileSync('./browser/templates/track-show.ejs', 'utf8');

module.exports = Backbone.View.extend({

  view_type: 'separate-charts',
  units: 'metric',

  range_from: 4000,
  range_to: 0,

  initialize: function() {

  },

  render: function() {
    this.$el.html(this.template());

    this.init_range_selector();

    var fl_time_start = this.model.points.first().get('gps_time');
    var gr_data = [];
    for (var i = 4000; i < 4200; i ++) {
      var point = this.model.points.at(i);
      gr_data.push([
        (point.get('gps_time') - fl_time_start) / 100,
        point.get('glide_ratio')
      ]);
    }

    $('#glideratio_chart').highcharts({
      chart: {
          type: 'spline'
      },
      title: {
          text: 'Glide ratio'
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: false
          }
        },
        series: {
          marker: {
            radius: 1
          },
        }
      },
      tooltip: {
        crosshairs: true,
        valueDecimals: 2
      },
      yAxis: {
        min: 0,
        title: {
          text: ' '
        }
      },
      credits: {
          enabled: false
      },
      series: [{
        name: 'Glide ratio',
        color: '#37889B',
        tooltip: {
            valueSuffix: ''
        },
        zIndex: 2,
        data: gr_data
      }],
    });

  },

  init_range_selector: function() {

    var _this = this;

    $("#range-selector").ionRangeSlider({
        min: 0, //Track.max_height,
        max: 4000, //Track.min_height,
        type: 'double',
        step: 50,
        prettify: false,
        hasGrid: true,
        from: 0, //Track.max_height,
        to: 4000, //Track.min_height,
        onFinish: function (obj) {      // callback is called on slider action is finished
            //if (Track.in_imperial) {
            //    Track.range_from = obj.fromNumber / mft_k;
            //    Track.range_to = obj.toNumber / mft_k;
            //} else {
            //    Track.range_from = obj.fromNumber;
            //    Track.range_to = obj.toNumber;
            //}
            //window.history.replaceState({}, document.title, "?f=" + Track.range_from + "&t=" + Track.range_to);
            _this.trigger('on-change-range');
            //set_chart_data();
        }
    });

  },

  template: ejs.compile(template_str)

});
