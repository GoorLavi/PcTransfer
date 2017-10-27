import fs from 'fs';
import Consts from '../consts';
import _ from 'lodash';
import fileType from 'file-type';

export const getFolderContent = folderPath => {

    const folderFullPath = combinePath(Consts.sharedFolderPath, folderPath);

    let foldersElements = [];

    let elementsNames = fs.readdirSync(folderFullPath);

    elementsNames.forEach(elementName => {

        let element = {name: elementName};

        let elementFullPath = combinePath(folderFullPath, elementName);

        element.type = determinateElementType(elementFullPath);

        element.folderPath = folderPath;

        foldersElements.push(element);

    });

    return foldersElements;
};

export const getFullFolderContent = folderPath => {

    const folderFullPath = combinePath(Consts.sharedFolderPath, folderPath);

    let foldersElements = {files: []};

    let elementsNames = fs.readdirSync(folderFullPath);

    elementsNames.forEach(elementName => {

        let element = {name: elementName};

        let elementFullPath = combinePath(folderFullPath, elementName);

        element.type = determinateElementType(elementFullPath);

        if (element.type === Consts.types.dir) {

            const dirPath = combinePath(folderPath, elementName);
            foldersElements[element.name] = getFullFolderContent(dirPath);
        }
        else {

            foldersElements.files.push(element.name);
        }
    });

    return foldersElements;
};

export const getFile = filePath => {

    return fs.readFileSync(filePath);
};

export const getLastPathFolder = path => {

    let pathArray = path.split('.');

    return _.last(pathArray);
};

export const determinateElementType = elementPath => {

    try {

        if (fs.statSync(elementPath).isDirectory())
            return Consts.types.dir;

        const element = getFile(elementPath);
        const elementType = fileType(element);

        if (elementType.mime.includes('image')) {
            return Consts.types.img;
        }
    }
    catch (e) {
        return Consts.types.file;
    }
};

export const combinePath = (...array) => {

    let path = "";

    array.forEach(dirName => {

        if (path.length && path[path.length - 1] !== '/' && dirName[0] !== '/')
            path += '/';

        path += dirName;


    });

    return path;
};

export const combineTreePath = (...array) => {

    let path = "";

    array.forEach(dirName => {

        if (path.length && dirName.length && path[path.length - 1] !== '.' && dirName[0] !== '.')
            path += '.';

        path += dirName;
    });

    return path;
};

export const removeLastBranch = (treePath) => {

    let treePathArray = treePath.split('.');

    treePathArray.pop();

    return treePathArray.join('.');
};

export const removeLastFolder = (path) => {

    let pathArray = path.split('/');

    pathArray.pop();

    return pathArray.join('/');
};

export const breakPath = path => {

    return path.split('/');
};

export const convertPathSlashesToDots = path => {

    return path.replace(/\//g, '.')
};

/**
 *
 * @param state
 * @param filePath
 * @param fileName
 * @returns {boolean}
 */
export const findFileExistenceOnState = (state, filePath, fileName) => {

    const branchPath = convertPathSlashesToDots(filePath);
    const fileBranchPath = fullFilePathToObjectTreeFilesPath(branchPath);
    const filesArray = _.get(state, fileBranchPath);

    return !!_.find(filesArray, file => file === fileName);
};

/**
 *
 * @param stateTreeObject
 * @param folderPath
 * @param name
 */
export const findFolderOnState = (stateTreeObject, folderPath, name) => {

    const folderTreePath = combineTreePath(folderPath, name);

    return folderTreePath.length ? _.get(stateTreeObject, folderTreePath) : stateTreeObject;
};

export const isFolderFullyChosen = (stateTreeObject, folderPath, name) => {

    const folderTreeObject = findFolderOnState(stateTreeObject, folderPath, name);

    if (!folderTreeObject || !folderTreeObject.fullyChosen)
        return false;

    return true;
};

export const fullFilePathToObjectTreeFilesPath = path => {

    return path.length ? path + '.files' : 'files';
};

export const fullDirPathToObjectTreeDirsPath = (path, dirName) => {

    return convertPathSlashesToDots(path) + '.' + dirName;
};


export const getFolderTreeFromState = (stateTree, path) => {

    // If path truly contains path
    if (path.length)
        return _.get(stateTree, path);

    // Else return the filly tree state
    return stateTree;
};

export const setFolderTreeInState = (stateTree, path, newFolderTree) => {

    if (path.length)
       return _.set(stateTree, path, newFolderTree);

    return _.set(stateTree, newFolderTree);
};