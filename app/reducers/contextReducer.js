import Consts from '../consts';
import {combinePath, removeLastFolder} from '../utiles/filesUtiles';

let initializedState = {
    mode: '',
    folder: '',
    section: Consts.section.fileSection
};

export default (state = initializedState, action) => {

    switch (action.type) {
        case 'CHANGE_MODE': {

            return Object.assign({}, state, {mode: action.mode});
        }
        case 'CHANGE_SECTION': {

            return Object.assign({}, state, {section: action.section});
        }
        case 'ENTER_SUB_FOLDER': {

            const newPath = combinePath(state.folder, action.subFolderName);
            return Object.assign({}, state, {folder: newPath});
        }
        case 'EXIT_FOLDER': {

            let stateObj = {};

            if (state.folder) {
                stateObj = {folder: removeLastFolder(state.folder)};
            }

            return Object.assign({}, state, stateObj);
        }
        default:
            return state;
    }
};
