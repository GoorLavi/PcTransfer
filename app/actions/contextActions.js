import thunk from "redux-thunk";
import Consts from "../consts";
import Modal, { generateDefaultErrorModal } from "../models/modal";
import { getDrivesList, getFolderContent } from "../managers/files-manager";
import { removeLastFolder, combinePath } from "../utils/filesUtils";
import { resetStore } from "./filesActions";

export const initializeState = () => {

	return (dispatch, getState) => {
		dispatch(setFolderPath(''));
		dispatch({ type: "INITIALIZED" })
	}
};


export const setCloneMode = () => {
	return { type: "CHANGE_MODE", mode: "cloneMode" };
};

export const setInsertMode = () => {
	return { type: "CHANGE_MODE", mode: "insertMode" };
};

/**
 * Changing the main path to the sub folder
 * @param newFolderName
 * @returns {{type: string, subFolderName: *}}
 */
export const enterSubFolder = newFolderName => {
	return (dispatch, getState) => {

		const state = getState();

		const newPath = combinePath(state.contextReducer.folder.path, newFolderName);
		dispatch(setFolderPath(newPath));
	}
};

export const goBack = () => {
	return (dispatch, getState) => {

		const folderPath = getState().contextReducer.folder.path;

		if (folderPath) {
			const newPath = removeLastFolder(folderPath)
			dispatch(setFolderPath(newPath));
		}
	}
};

export const changeToParentFolderName = (folderName = Consts.mainFolderDisplayName) => {
	return (dispatch, getState) => {

		const fullPath = getState().contextReducer.folder.path;
		const index = fullPath.indexOf(folderName);

		let newPath = '';

		// Main folder (not exists in folderPath)
		if (index !== -1)
			newPath = fullPath.substring(0, index + folderName.length + 1);

		dispatch(setFolderPath(newPath));
	};
};

export const setFolderPath = (newFolderPath) => {
	return (dispatch, getState) => {

		dispatch({ type: "SET_FOLDER_PATH", folderPath: newFolderPath });
		dispatch(setFolderContent(newFolderPath));

	};
};

/**
 * Takes folder path save the content data to state 
 * @param {string} folderPath 
 */
export const setFolderContent = folderPath => {
	return (dispatch, getState) => {

		dispatch(loadingFolderContent());

		getFolderContent(folderPath).then((folderContent) => {

			dispatch({ type: "SET_FOLDER_CONTENT", content: folderContent });
			dispatch(loadingFolderContentFinished());

		}, () => {

			dispatch(loadingFolderContentFinished());
			dispatch(openModal(generateDefaultErrorModal()));
		})

	};
};

export const changeSection = section => {
	return (dispatch, getState) => {
		// In case switching to "select device zone"
		if (section === Consts.section.targetFolderSection)
			dispatch(signUsbDevices()); // Find and store connected devices

		dispatch({ type: "CHANGE_SECTION", section });
	};
};

// Signing connected devices to store
export const signUsbDevices = () => {
	return (dispatch, getState) => {

		dispatch({ type: "LOADING_USB_DEVICES" });

		getDrivesList().then(
			usbDevices => {
				dispatch({ type: "SIGN_USB_DEVICES", devices: usbDevices });

				dispatch({ type: "LOADING_USB_DEVICES_FINISHED" });

			},
			() => {
				const typeId = Consts.modalTypes.error.id;
				const modal = new Modal(
					typeId,
					"Sorry",
					"Could not find any devices error has been accoured..."
				);
				dispatch({ type: "LOADING_USB_DEVICES_FINISHED" });
				dispatch(openModal(modal));
			}
		);
	};
};

export const manageUsbDeviceClick = clickedDevicePath => {
	return (dispatch, getState) => {
		const state = getState();
		const { selectedUsbDevicePath } = state.contextReducer;

		const type = "SELECT_USB_DEVICE";

		// Case device already selected
		// remove the device seletion
		if (selectedUsbDevicePath === clickedDevicePath) dispatch({ type });
		else dispatch({ type, clickedDevicePath });
	};
};

export const closeModal = () => {
	return {
		type: "CLOSE_MODAL"
	};
};


export const copyFiles = () => {
	return {
		type: "COPY_FILES"
	};
};

export const copyFilesFinished = (copySucceed) => {
	return (dispatch, getState) => {

		dispatch({ type: "COPY_FILES_FINISHED" });

		if (copySucceed){
			dispatch(resetStore())
			dispatch(initializeState())
		}
	};
};


export const openModal = modal => {
	return {
		type: "OPEN_MODAL",
		modal
	};
};

export const loadingFolderContent = () => {

	return { type: 'LOADING_FOLDER_CONTENT' };
}

export const loadingFolderContentFinished = () => {

	return { type: 'LOADING_FOLDER_CONTENT_FINISHED' };
}