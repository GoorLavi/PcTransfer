import Consts from "../consts";
import {combinePath, removeLastFolder} from "../utiles/filesUtils";

let initializedState = {
	initialized: false,
	mode: "",
	folder: {path: "", content:{}},
	section: Consts.section.fileSection,
	usbDevices: [],
	selectedUsbDevicePath: "",
	modal: null,
	loadingFolderContent: true
};

export default (state = initializedState, action) => {
	switch (action.type) {
		case "INITIALIZED": {
			
			return _.set(state, 'initialized', true);
		}
		case "CHANGE_MODE": {
			return Object.assign({}, state, {mode: action.mode});
		}
		case "CHANGE_SECTION": {
			return Object.assign({}, state, {section: action.section});
		}
	
		case "SET_FOLDER_PATH": {

			return _.set(state, 'folder.path', action.folderPath);
		} 
		case "SET_FOLDER_CONTENT": {

			return _.set(state, 'folder.content', action.content);
		} 
		case "SIGN_USB_DEVICES": {
			return Object.assign({}, state, {usbDevices: action.devices});
		}
		case "SELECT_USB_DEVICE": {
			return Object.assign({}, state, {
				selectedUsbDevicePath: action.clickedDevicePath
			});
		}
		case "CLOSE_MODAL": {
			return Object.assign({}, state, {
				modal: null
			});
		}
		case "OPEN_MODAL": {
			return Object.assign({}, state, {
				modal: action.modal
			});
		}
		case "LOADING_FOLDER_CONTENT": {
			return Object.assign({}, state, {
				loadingFolderContent: true
			});
		}
		case "LOADING_FOLDER_CONTENT_FINISHED": {
			return Object.assign({}, state, {
				loadingFolderContent: false
			});
		}
		default:
			return state;
	}
};
