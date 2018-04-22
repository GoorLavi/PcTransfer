import {ipcRenderer} from 'electron';
import UsbDevice from '../models/usbDevice';
import {store} from '../index';

export const startCopy = (filesTree, selectedDevice, sourcePath) => {

  // Copy files tree to the drive
  ipcRenderer.send('copy-files', {filesTree, selectedDevice, sourcePath});
  console.log('copy started');
}

ipcRenderer.on('copy-files-finished', (event, error) => {

  if(error)
    console.error("could not copy files", error);

});



// Requesting drivesList from main process
export const getDrivesList = () => {

  ipcRenderer.send('get-connected-devices');

  return new Promise((resolve, reject) => {
 
        // Retrieving drivesList from main process
    ipcRenderer.on('connected-devices', (event, devices) => {
      
      // Converting device object to model
     const drivesList = _.map(devices, device => new UsbDevice(device));

      if (drivesList.length) {
        console.log('found devices: ', devices);
        resolve(drivesList);
      } 
      else
        reject(drivesList);
    });
  });
};

export const deepGetFolderContent = folderPath => {

  ipcRenderer.send('deep-get-folder-content', folderPath);

  return new Promise((resolve, reject) => {
    
    // Retrieving folder content
    ipcRenderer.on('deep-folder-content-res', (event, error, folderContent) => {

      if(error)
        reject(error);
      else
        resolve(folderContent)
      
    });
  });
};


export const getFolderContent = (folderPath) => {

  ipcRenderer.send('get-folder-content', folderPath);

  return new Promise((resolve, reject) => {
    
    // Retrieving folder content
    ipcRenderer.on('folder-content-res', (event, error, folderContent) => {

      if(error)
        reject(error);
      else
        resolve(folderContent)
      
    });
  });
}

