window.$           = window.jQuery = require('jquery');
window.Backbone    = require('backbone');
window._           = window.underscore = require('backbone/node_modules/underscore');
window.ipc         = require('electron').ipcRenderer;
//window.ipcRenderer = require('ipcRenderer');
window.I18n        = require('i18n-js');
window.ejs         = require('ejs');
window.fs          = require('fs');

I18n.locale = ipc.sendSync('get-locale');

window.Skyderby = {
  helpers: {},
  collections: require('./browser/collections/collections.js'),
  models: require('./browser/models/models.js'),
  views: require('./browser/views/views.js'),
};

window.App = new Skyderby.views.App_view();

//////////////////////////////////////////////////////////
// Main process event handlers

window.addEventListener('mounted', function(device_path) {
  App.trigger('usb-drive-mounted', device_path);
  console.log(device_path);
});

window.addEventListener('unmounted', function(device_path) {
  App.trigger('usb-drive-unmounted', device_path);
  console.log(device_path);
});

ipc.on('flysight-did-read', function(event, data) { App.trigger('show-flysight'); });
ipc.on('track-did-read', function(event, data) { App.trigger('show-track', data); });
ipc.on('config-did-read', function(event, data) { App.trigger('show-config', data); });
