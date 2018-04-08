import thunk from 'redux-thunk';
import Consts from '../consts';
import {getDrivesList} from '../utiles/filesUtils';

export const setCloneMode = () => {

  return {type: 'CHANGE_MODE', mode: 'cloneMode'};
};

export const setInsertMode = () => {

  return {type: 'CHANGE_MODE', mode: 'insertMode'};
};

/**
 * Changing the main path to the sub folder
 * @param newFolderName
 * @returns {{type: string, subFolderName: *}}
 */
export const enterSubFolder = (newFolderName) => {

  return {type: 'ENTER_SUB_FOLDER', subFolderName: newFolderName};
};

export const exitFolder = () => {

  return {type: 'EXIT_FOLDER'};
};

export const changeSection = (section) => {
  return(dispatch, getState) => {

    // In case switching to "select device zone"
    if (section === Consts.section.targetFolderSection) 
      dispatch(signUsbDevices()); // Find and store connected devices
    
    dispatch({type: 'CHANGE_SECTION', section});
  };
}

// Signing connected devices to store
export const signUsbDevices = () => {

  return(dispatch, getState) => {

    getDrivesList().then((usbDevices) => {
      dispatch({type: 'SIGN_USB_DEVICES', devices: usbDevices});
    }, () => {
      alert("Sorry could not find any devices error has been accoured");
    });
  };
}
