import {ipcRenderer} from 'electron';
import UsbDevice from '../models/usbDevice';

export const startCopy = (filesTree, selectedDevice, sourcePath) => {

  // Copy files tree to the drive
  ipcRenderer.send('copy-files', {filesTree, selectedDevice, sourcePath});
  console.log('copy started');
}

ipcRenderer.on('copy-files-finished', (event, error) => {

if(error)
  console.log("could not copy files");

});


let drivesList = [];

// Retrieving drivesList from main process
ipcRenderer.on('connected-devices', (event, devices) => {
  console.log('found devices: ', devices);

  // Converting device object to model
  drivesList = _.map(devices, device => new UsbDevice(device));
});

// Requesting drivesList from main process
export const getDrivesList = () => {

  // Initial the array
  drivesList = [];

  ipcRenderer.send('get-connected-devices');

  return new Promise((resolve, reject) => {
    let counter = 0,
      maxCounter = 8;

    let devicesInterval = setInterval(() => {

      if (drivesList.length) {

        resolve(drivesList);
        clearInterval(devicesInterval);

      } else if (counter === maxCounter) {

        reject(drivesList);
        clearInterval(devicesInterval);
      }

      counter++;
    }, 300);

  });
};
