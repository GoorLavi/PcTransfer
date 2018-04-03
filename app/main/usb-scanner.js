import {ipcMain} from 'electron';
import _ from 'lodash';
import drivelist from 'drivelist';

ipcMain.on('get-connected-devices', function(event, arg) {

  drivelist.list((error, drives) => {

    if (error) {
      console.log('There is an error reading usb devices');
      throw error;
    }

    const removableDrives = _.filter(drives, drive => drive.isRemovable);
    console.log('sending usb removable devices to main window', removableDrives);
    event.sender.send('connected-devices', removableDrives);

    // console.log(drive.mountpoints[0].path);
  });
});
