import { addFileToState, addFolderContentToState, removeFile, removeFolderContentFromState} from '../utils/fileReducerUtils';


const initializedState = {};


export default (state = initializedState, action) => {

    switch (action.type) {
        case "RESET_STORE": {
			return {};
		}
        case 'ADD_FILE': {

            const newState = addFileToState(state, action.fileData);

            return Object.assign({}, newState);

        }
        case 'REMOVE_FILE': {

            const {path, name} = action.file;

            const newState = removeFile(state, path, name);

            return Object.assign({}, newState);
        }
        case 'REMOVE_FOLDER_FILES': {

            const {parentFolderPath, folderName} = action;

            const newState = removeFolderContentFromState(state, parentFolderPath, folderName);

            return Object.assign({}, newState);

        }
        case 'ADD_FOLDER_CONTENT': {

            const {folderPath, fullFolderTree} = action;

            const newState = addFolderContentToState(state, folderPath, fullFolderTree);

            return Object.assign({}, newState);
        }
        default:
            return state;
    }
};
