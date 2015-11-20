'use strict';

module.exports = start;

function start() {

  var BrowserWindow = require('browser-window');  // Module to create native browser window.

  // Create the browser window.
  GLOBAL.mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    'min-height': 520,
    'min-width': 768
  });

  // and load the index.html of the app.
  GLOBAL.mainWindow.loadURL('file://' + rootPath + '/index.html');

  // Open the DevTools.
  GLOBAL.mainWindow.openDevTools();

  // Emitted when the window is closed.
  GLOBAL.mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    GLOBAL.mainWindow = null;
  });

  var usb_mount_notify = require('./usb-mount-notify');
  usb_mount_notify.onDeviceChange(onDeviceChange, GLOBAL.mainWindow);

}

function onDeviceChange(event_name, device_path) {
  GLOBAL.mainWindow.webContents.send(event_name, device_path);
}
