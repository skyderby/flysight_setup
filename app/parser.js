var fs = require('fs');
var parse = require('csv-parse');

exports.execute = function(path, callback) {
  var input = fs.readFileSync(path, 'utf8');
  var extension = path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2);

  if (extension === 'csv') {
    var current_processor = csv_processor;
  } else {
    throw 'Not supported';
  };

  return current_processor(input, callback);
}

function csv_processor(input, callback) {
  parse(input, function(err, output){
    flysight_parser(output, callback);
  });
}

function flysight_parser(data, callback) {
  var output = [];

  for (var i = 2; i < data.length; i++) {
    output.push(process_flysight_row(data[i]));
  }

  callback(output);
}

function process_flysight_row(row) {
  var DATETIME = 0,
      LATITUDE = 1,
      LONGITUDE = 2,
      ALTITUDE = 3,
      VEL_NORTH = 4,
      VEL_EAST = 5,
      VEL_VERTICAL = 6,
      HOR_ACCURACY = 7,
      VER_ACCURACY = 8,
      SPD_ACCURACY = 9;

  var point = {};
  point.gps_time = Date.parse(row[DATETIME]);
  point.latitude = Number(row[LATITUDE]);
  point.longitude = Number(row[LONGITUDE]);
  point.altitude = Number(row[ALTITUDE]);
  point.h_speed = Math.sqrt(
    Math.pow(Number(row[VEL_NORTH]), 2) + Math.pow(Number(row[VEL_EAST]), 2)
  );
  point.v_speed = Number(row[VEL_VERTICAL]);
  point.glide_ratio = point.v_speed === 0 ? 0 : point.h_speed / point.v_speed;

  return point;
}
