exports.onDeviceChange = function(callback, mainWindow) {
  if (process.platform == 'darwin') {
    setOSXobserver(callback);
  } else if (process.platform == 'win32') {
    setWindowsObserver(callback, mainWindow);
  }
};

function setOSXobserver(callback) {
  var spawn = require('child_process').spawn,
      usb_notifier = spawn('./app/bin/usb-mount-notifier');

  usb_notifier.stdout.on('data', function (data) {
    process.stdout.write(data);

    var separator_index = data.indexOf(':');
    var event_name = data.substr(0, separator_index).trim();
    var device_path = data.substr(separator_index + 1).trim();

    callback(event_name, device_path);
  });
}

function setWindowsObserver(callback, mainWindow) {

  var ref = require('ref');
  var StructType = require('ref-struct');

  var DEV_BROADCAST_VOLUME = StructType({
    dbcv_size: ref.types.uint32,        //  DWORD dbcv_size;
    dbcv_devicetype: ref.types.uint32,  //  DWORD dbcv_devicetype;
    dbcv_reserved: ref.types.uint32,    //  DWORD dbcv_reserved;
    dbcv_unitmask: ref.types.uint32,    //  DWORD dbcv_unitmask;
    dbcv_flags: ref.types.short         //  WORD  dbcv_flags;
  });

  mainWindow.hookWindowMessage(
    Number.parseInt('0x0219'), // WM_DEVICECHANGE
    function(w_param, l_param_pointer) {
      var event_name;
      if (w_param.readUInt32LE(0) == 0x8000) {        // DBT_DEVICEARRIVAL
        event_name = 'mounted';
      } else if (w_param.readUInt32LE(0) == 0x8004) { // DBT_DEVICEREMOVECOMPLETE
        event_name = 'unmounted'
      }

      if (!event_name) return;

      var l_param = ref.readPointer(l_param_pointer, 0, DEV_BROADCAST_VOLUME.size);
      l_param.type = DEV_BROADCAST_VOLUME;
      var val = l_param.deref();

      var device_path = getDriveLetterFromUnitmask(val.dbcv_unitmask) + ":\\";

      callback(event_name, device_path);
    }
  );
}

function getDriveLetterFromUnitmask(unitmask) {
  var i;
  for (i = 0; i < 26; i++) {
    if (unitmask & 0x1) break;
    unitmask = unitmask >>> 1;
  }

  return String.fromCharCode('A'.charCodeAt(0) + i);
}
