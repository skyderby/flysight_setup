var fs = require('fs');

exports.execute = function(path, callback) {
//  callback(fs.readdirSync(path));
// return;
  var input = fs.readFileSync(path, 'utf8');
  var ext = extension(path);

  if (ext.toLowerCase() !== 'txt') return;

  var config = {
    filepath: path, 
    alarms: []
  };
  var alarm_num = 0;
  var config_data = input.split('\n');

  for (var i = 0; i < config_data.length; i++) {
    var line = config_data[i].split(';')[0];
    var param = line.split(':');
    var name = param[0];
    var value = param[1];

    if (name === undefined) continue;
    if (value === undefined) continue;

    name = name.trim().toLowerCase();
    value = value.trim().toLowerCase();

    if (['alarm_elev', 'alarm_type', 'alarm_file'].indexOf(name) !== -1) {
      if (name == 'alarm_elev') {
        alarm_num += 1;
        config.alarms[alarm_num - 1] = {};
      }
      config.alarms[alarm_num - 1][name] = value;
    } else {
      config[name] = value;
    }
  }

  callback(config);
}

function readdir(path) {
  // var structure = [];
  // var folder = fs.readdirSync(path);
  // for (var i = 0; i < folder.length; i++) {
  //   var currentElement = folder[i];
  //   var currentElementPath = path + '/' + currentElement;
  //   var stat = fs.lstatSync(currentElementPath);
  //   if stat.isDirectory() {
  //     structure[currentElement] = readdir(currentElementPath);
  //   } else {
  //     var ext = extension(currentElement);
  //
  //     //structure[currentElement];
  //   }
  // }
  // return structure;
}

function readConfig(path) {

}

function extension(path) {
  return path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2);
}
