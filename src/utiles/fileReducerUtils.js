import _ from 'lodash';
import {
    convertPathSlashesToDots,
    fullFilePathToObjectTreeFilesPath,
    fullDirPathToObjectTreeDirsPath,
    combineTreePath,
    removeLastBranch,
    removeLastFolder,
    getLastPathFolder,
    getFolderTreeFromState,
    isFolderFullyChosen,
    setFolderTreeInState,
    stateSizeInMByte
} from '../utiles/filesUtiles';
import Consts from '../consts';

/**
 * Simply adding file to state tree
 * @param state
 * @param fileData
 * @returns {{}}
 */
export const addFileToState = (state, fileData) => {

    const { folderPath } = fileData;

    const branchPath = convertPathSlashesToDots(folderPath);

    let newState = {};

    const fileBranchPath = fullFilePathToObjectTreeFilesPath(branchPath);

    // If the folder don't have selected files already
    // create the files array with the file in it
    if (!_.get(state, fileBranchPath))
        newState = _.set(state, fileBranchPath, [fileData]);

    else { // Push the file name into the files array

        let filesArray = _.get(state, fileBranchPath);

        filesArray.push(fileData);

        newState = _.set(state, fileBranchPath, filesArray);
    }

    // console.log(stateSizeInMByte(newState));

    return newState

};


const unChooseFolder = (state, branchPath) => {

    let newState = state;


    // Runs all over the folder tree from bottom to top
    // and removing the fully chosen sign
    for (let i = 0; i < branchPath.split('.').length; i++) {

        if (i) // If its not the first loop run
            branchPath = removeLastBranch(branchPath);

        let parentFolderPath = removeLastBranch(branchPath);
        const folderName = getLastPathFolder(branchPath);


        const isFolderChosen = isFolderFullyChosen(newState, parentFolderPath, folderName);

        let dirTreeObject = getFolderTreeFromState(state, branchPath);

        if (isFolderChosen) {

            dirTreeObject = _.omit(dirTreeObject, 'fullyChosen');
            newState = setFolderTreeInState(newState, branchPath, dirTreeObject)
        }
        else {
            break;
        }
    }

    return newState;
};

/**
 * Simply removing file from state tree
 * @param state
 * @param path
 * @param name
 * @returns new state Object
 */
export const removeFile = (state, path, name) => {

    const branchPath = fullFilePathToObjectTreeFilesPath(path);

    const filesArray = _.get(state, branchPath);

    const newFileArray = _.reject(filesArray, fileName => fileName === name);


    if (isFolderFullyChosen(state, path, ''))
        unChooseFolder(state, path);

    // If the files array is empty remove the
    // array from the state tree
    if (!newFileArray.length) {
        let newState = _.omit(state, branchPath);

        // const dirObject = _.get(newState, path);
        const dirObject = getFolderTreeFromState(newState, path);

        // If the dir obj is empty remove the folder from the tree
        if (Object.keys(dirObject).length === 0 && dirObject.constructor === Object) {

            const fatherBranch = removeLastBranch(branchPath);
            return setFolderTreeInState(newState, fatherBranch);
        }

        return newState;
    }
    else
        return _.set(state, branchPath, newFileArray);
};


/**
 *  Insert all the folders content
 *  including the sub files and folders to the state
 * @param state
 * @param folderPath
 * @param fullFolderTree
 * @returns new state Object
 */
export const addFolderContentToState = (state, folderPath, fullFolderTree) => {

    fullFolderTree = setFoldersTreeToFullyChosen(state, folderPath, fullFolderTree);
    return _.set(state, folderPath, fullFolderTree);
};

/**
 *  Removing folder Path from the tree
 * @param state
 * @param parentFolderPath
 * @param folderName
 * @returns new state Object
 */
export const removeFolderContentFromState = (state, parentFolderPath, folderName) => {

    let FolderPath = combineTreePath(parentFolderPath, folderName);

    let newState = unChooseFolder(state, FolderPath);

    newState = _.omit(newState, FolderPath);

    return newState;
};

/**
 * Method responsible to change all tree
 * folders to fully Chosen
 * @param state
 * @param folderPath
 * @param fullFolderTree
 * @returns {Object|*}
 */
const setFoldersTreeToFullyChosen = (state, folderPath, fullFolderTree) => {

    const subDirsTree = setAllSubFoldersToFullyChosen(fullFolderTree);

    subDirsTree.fullyChosen = true;

    return subDirsTree;
};

/**
 * Sets all the subFolders in the tree
 * to fully Chosen
 * @param fullFolderTree
 * @returns {Object|*}
 */
const setAllSubFoldersToFullyChosen = (fullFolderTree) => {

    return _.mapValues(fullFolderTree, element => {
        if (typeof element === 'object' && !Array.isArray(element)) {
            element.fullyChosen = true;

            setAllSubFoldersToFullyChosen(element);

        }

        return element;

    });

    // fullFolderTree.map();
};


