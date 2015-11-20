var app           = require('app');             // Module to control application life.
// Report crashes to our server.
require('crash-reporter').start();

// Default locale
GLOBAL.locale = 'en';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
GLOBAL.mainWindow = null;

GLOBAL.rootPath = __dirname;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  locale = app.getLocale().substr(0, 2);
  require('./app/start')();
});

require('./app/ipc-handler')();
