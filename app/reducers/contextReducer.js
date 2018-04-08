import Consts from '../consts';
import {combinePath, removeLastFolder} from '../utiles/filesUtils';

let initializedState = {
  mode: '',
  folder: '',
  section: Consts.section.fileSection,
  usbDevices: []
};

export default(state = initializedState, action) => {

  switch (action.type) {
    case 'CHANGE_MODE':
      {

        return Object.assign({}, state, {mode: action.mode});
      }
    case 'CHANGE_SECTION':
      {

        return Object.assign({}, state, {section: action.section});
      }
    case 'ENTER_SUB_FOLDER':
      {

        const newPath = combinePath(state.folder, action.subFolderName);
        return Object.assign({}, state, {folder: newPath});
      }
    case 'EXIT_FOLDER':
      {

        let stateObj = {};

        if (state.folder) {
          stateObj = {
            folder: removeLastFolder(state.folder)
          };
        }

        return Object.assign({}, state, stateObj);
      }
    case 'SIGN_USB_DEVICES':
      {
        return Object.assign({}, state, {usbDevices: action.devices});
      }
    default:
      return state;
  }
};
