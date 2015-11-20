var ipc           = require('electron').ipcMain;
var dialog        = require('dialog');

module.exports = init;

function init() {
  ipc.on('open-track-file', openTrackFile);
  ipc.on('configure-flysight', configureFlysight);
  ipc.on('get-locale', getLocale);
}

var parser = require('./parser.js');
function openTrackFile(event, arg) {
  var path = dialog.showOpenDialog(GLOBAL.mainWindow, { properties: ['openFile'] });

  if (path) {
    parser.execute(path[0], function(track_data) {
      event.sender.send('track-did-read', track_data);
    });
  }
}

var configParser = require('./config-parser.js');
function configureFlysight(event) {
  var path = dialog.showOpenDialog(GLOBAL.mainWindow, { properties: ['openFile'] });

  if (path) {
    configParser.execute(path[0], function(config_data) {
      event.sender.send('config-did-read', config_data);
    })
  }
}

// Sync method
function getLocale(event) {
  event.returnValue = GLOBAL.locale;
}
