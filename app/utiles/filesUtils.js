import fs from 'fs';
import Consts from '../consts';
import _ from 'lodash';
import fileType from 'file-type';
import flatten from 'flat';
import UsbDevice from '../models/usbDevice';

import {ipcRenderer} from 'electron';
import {remote} from 'electron';

// import {requireTaskPool} from 'electron-remote';

// const files = requireTaskPool(require.resolve('../remote-process/files-manager'));

// const answer = files.calculate().then(() => {
//   console.log('done');
// });

// console.log('title', answer);

export const getFolderContent = folderPath => {

  const folderFullPath = combinePath(Consts.sharedFolderPath, folderPath);

  let foldersElements = [];

  let elementsNames = fs.readdirSync(folderFullPath);

  elementsNames.forEach(elementName => {

    let element = {
      name: elementName
    };

    const elementFullPath = combinePath(folderFullPath, elementName);

    const elementProps = getElementProps(elementFullPath);

    element.type = determinateElementType(elementFullPath, elementProps);

    element.folderPath = folderPath;

    foldersElements.push(Object.assign({}, element, elementProps));

  });

  return foldersElements;
};

export const getElementProps = (path) => {

  let element = fs.statSync(path);

  // Size on MByte
  return {
    size: (element.size / 1000000),
    isDir: element.isDirectory()
  };
};

export const getFullFolderContent = folderPath => {

  const folderFullPath = combinePath(Consts.sharedFolderPath, folderPath);

  let foldersElements = {
    files: []
  };

  let elementsNames = fs.readdirSync(folderFullPath);

  elementsNames.forEach(elementName => {

    let element = {
      name: elementName
    };

    let elementFullPath = combinePath(folderFullPath, elementName);

    const elementProps = getElementProps(elementFullPath);

    element.type = determinateElementType(elementFullPath, elementProps);

    if (elementProps.isDir) {

      const dirPath = combinePath(folderPath, elementName);
      foldersElements[element.name] = getFullFolderContent(dirPath);
    } else {
      const mergedElement = Object.assign({}, element, elementProps);
      foldersElements.files.push(mergedElement);
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

export const determinateElementType = (elementPath, elementProps) => {

  if (elementProps.isDir) 
    return Consts.types.dir;
  
  // Get the file in order to fileType the element
  const element = getFile(elementPath);
  const elementType = fileType(element);

  if (!elementType) {

    return Consts.types.file;
  } else { // If the file type is known
    if (elementType.mime.includes('image')) 
      return Consts.types.img;
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

  return path.length
    ? path.replace(/\//g, '.')
    : "";
};

export const convertSlashesToBackSlashes = path => {

  return path.replace(/\//g, '/\\/');
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

  return !!_.find(filesArray, file => file.name === fileName);
};

/**
 *
 * @param stateTreeObject
 * @param folderPath
 * @param name
 */
export const findFolderOnState = (stateTreeObject, folderPath, name) => {

  const folderTreePath = combineTreePath(folderPath, name);

  return folderTreePath.length
    ? _.get(stateTreeObject, folderTreePath)
    : stateTreeObject;
};

export const isFolderFullyChosen = (stateTreeObject, folderPath, name) => {

  const folderTreeObject = findFolderOnState(stateTreeObject, folderPath, name);

  return folderTreeObject && folderTreeObject.fullyChosen
};

export const fullFilePathToObjectTreeFilesPath = path => {

  return path.length
    ? path + `.${Consts.props.files}`
    : Consts.props.files;
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

/**
 *  Find selected files Weight
 * @param stateTree
 * @returns {number}
 */
export const stateSizeInMByte = (stateTree) => {

  const flattedStateTree = flatten(stateTree);

  let SizeInMB = 0;

  _.forEach(flattedStateTree, (prop, propsName) => {
    if (_.endsWith(propsName, Consts.props.size)) 
      SizeInMB += prop;
    }
  );

  return SizeInMB;
};

let drivesList = [];

// Retrieving drivesList from main process
ipcRenderer.on('connected-devices', (event, devices) => {
  console.log('found devices: ', devices);

  // Converting device object to model
  drivesList = _.map(devices, device => new UsbDevice(device));
});

// Requesting drivesList from main process
export const getDrivesList = () => {

  // Initial the array
  drivesList = [];

  ipcRenderer.send('get-connected-devices');

  return new Promise((resolve, reject) => {
    let counter = 0,
      maxCounter = 8;

    let devicesInterval = setInterval(() => {

      if (drivesList.length) {

        resolve(drivesList);
        clearInterval(devicesInterval);

      } else if (counter === maxCounter) {

        reject(drivesList);
        clearInterval(devicesInterval);
      }

      counter++;
    }, 300);

  });
};
