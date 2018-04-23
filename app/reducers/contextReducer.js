import Consts from "../consts";
import { combinePath, removeLastFolder } from "../utils/filesUtils";

function initializedState() {

	Object.assign(this, {
		initialized: false,
		mode: "",
		folder: { path: "", content: {} },
		section: Consts.section.fileSection,
		usbDevices: [],
		loadingUsbDevices: false,
		selectedUsbDevicePath: "",
		modal: null,
		loadingFolderContent: true,
		copyingFiles: false
	});
};

export default (state = new initializedState(), action) => {
	switch (action.type) {
		case "INITIALIZED": {

			return Object.assign(new initializedState(), { initialized: true });
		}
		case "CHANGE_MODE": {
			return Object.assign({}, state, { mode: action.mode });
		}
		case "CHANGE_SECTION": {
			return Object.assign({}, state, { section: action.section });
		}

		case "SET_FOLDER_PATH": {

			return _.set(state, 'folder.path', action.folderPath);
		}
		case "SET_FOLDER_CONTENT": {

			return _.set(state, 'folder.content', action.content);
		}
		case "SIGN_USB_DEVICES": {
			return Object.assign({}, state, { usbDevices: action.devices });
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
		case "LOADING_USB_DEVICES": {
			return Object.assign({}, state, {
				loadingUsbDevices: true
			});
		}
		case "LOADING_USB_DEVICES_FINISHED": {
			return Object.assign({}, state, {
				loadingUsbDevices: false
			});
		}
		case "COPY_FILES": {
			return Object.assign({}, state, {
				copyingFiles: true
			});
		}
		case "COPY_FILES_FINISHED": {
			return Object.assign({}, state, {
				copyingFiles: false
			});
		}
		default:
			return state;
	}
};
