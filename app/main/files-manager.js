import {ipcMain} from 'electron';
import copydir from 'copy-dir';
import { findFileExistenceOnState, getLastPathFolder } from '../utiles/filesUtils';
import _ from 'lodash';


ipcMain.on('copy-files', function(event, {filesTree, sourcePath, selectedDevice}) {


  copydir(sourcePath, selectedDevice+'/testFolder', (stat, fullPath, filename) => {
  
  if(sourcePath[sourcePath.length-1] === '/')
    sourcePath= sourcePath.substring(0, sourcePath.length-1);

  const arr = sourcePath.split('/');
  let lastFolder = _.last(arr);

  const startIndex = fullPath.indexOf(lastFolder);
  const endIndex = lastFolder.length+1;
  let endPath = fullPath.slice(startIndex+endIndex);
  endPath = endPath.replace(filename, "");

  if(findFileExistenceOnState(filesTree, endPath, filename))
    return true;

  return false;  

  },(err) => {

    console.log(err);
    event.sender.send('copy-files-finished', err);

  });
});


// Cleaning the full path into the partial
// path starting from main dolder
const cleanToPartialPath = (filepath, sourcePath) => {

  const index = filepath.indexOf(sourcePath);
  const endIndex = sourcePath.length+1;
  return filepath.substring(index, endIndex);
}
