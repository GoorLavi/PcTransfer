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
} from '../utils/filesUtils';
import { addFile, removeFile, addFolderFiles, removeFolderFiles } from '../actions/filesActions';
import { enterSubFolder } from '../actions/contextActions';
import { deepGetFolderContent } from '../managers/files-manager';


const mapStateToProps = (state, ownProps) => {

    const {folderPath, name, type} = ownProps.element;

    let element = Object.assign({}, ownProps.element);

    if (type === Consts.types.dir)
        element.itemSelected = isFolderFullyChosen(state.filesReducer, folderPath, name);

    else
        element.itemSelected = findFileExistenceOnState(state.filesReducer, folderPath, name);

    return {
        element
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        onClick: (elementData) => {

            const { folderPath, name, type, itemSelected } = elementData;
            const { types } = Consts;

            // Case of a dir remove or add all files inside
            if (type === types.dir) {
                if (itemSelected)
                    dispatch(removeFolderFiles(folderPath, name));

                else {
                    
                    const fullPath = combinePath(folderPath, name);
                    deepGetFolderContent(fullPath).then((fullFolderContent) => {

                        dispatch(addFolderFiles(fullPath, fullFolderContent));
                    }, (error) => {
                        console.log(error);
                    });

                }
            }
            else { // Add or remove the file

                const fullTreePath = convertPathSlashesToDots(folderPath);

                if (itemSelected) {
                    dispatch(removeFile(fullTreePath, name));
                }
                else {
                    dispatch(addFile(elementData));
                }
            }
        },
        onDoubleClick: (elementProps) => {
            if (elementProps.type === Consts.types.dir) {
                dispatch(enterSubFolder(elementProps.name));
            }
        }
    }
};


const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {

    const { element } = propsFromState;

    return {
        onClick: () => propsFromDispatch.onClick(element),
        onDoubleClick: () => propsFromDispatch.onDoubleClick(element),
        element: element
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExplorerElement)