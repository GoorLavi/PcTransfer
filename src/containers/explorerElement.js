import {connect} from 'react-redux';
import ExplorerElement from '../components/explorerElement';
import _ from 'lodash';
import Consts from '../consts';
import {
    isFolderFullyChosen,
    combinePath,
    findFileExistenceOnState,
    getFullFolderContent,
    combineTreePath,
    convertPathSlashesToDots
} from '../utiles/filesUtiles';
import {addFile, removeFile, addFolderFiles, removeFolderFiles} from '../actions/filesActions';
import { enterSubFolder } from '../actions/contextActions';


const mapStateToProps = (state, ownProps) => {

    const {folderPath, name, type} = ownProps;

    let itemSelected;


    if (type === Consts.types.dir)
        itemSelected = isFolderFullyChosen(state.filesReducer, folderPath, name);

    else
        itemSelected = findFileExistenceOnState(state.filesReducer, folderPath, name);

    return {
        itemSelected,
        folderPath,
        name,
        type
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (elementProps) => {

            const {folderPath, name, itemSelected, type} = elementProps;
            const {types} = Consts;

            // Case of a dir remove or add all files inside
            if (type === types.dir) {
                if (itemSelected)
                    dispatch(removeFolderFiles(folderPath, name));

                else {

                    const fullPath = combinePath(folderPath, name);
                    const fullFolderContent = getFullFolderContent(fullPath);

                    const fullTreePath = combineTreePath(folderPath, name);
                    dispatch(addFolderFiles(fullTreePath, fullFolderContent));
                }
            }
            else { // Add or remove the file

                const fullTreePath = convertPathSlashesToDots(folderPath);

                if (itemSelected)
                    dispatch(removeFile(fullTreePath, name));

                else
                    dispatch(addFile(fullTreePath, name));
            }
        },
        onDoubleClick: (elementProps) => {
            if (elementProps.type === Consts.types.dir) {
                dispatch(enterSubFolder(elementProps.name));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerElement)