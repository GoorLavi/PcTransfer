import {ipcMain} from 'electron';
import copyFilesTree from 'copy-files-tree';
import _ from 'lodash';
import { getFolderFullContent } from '../utiles/filesUtils';
import fs from 'fs';


ipcMain.on('copy-files', function(event, {filesTree, sourcePath, selectedDevice}) {


  const error = copyFilesTree(filesTree, sourcePath, selectedDevice+'\\testFolder')

  console.log(error);
  
  event.sender.send('copy-files-finished', error);

});


ipcMain.on('get-folder-content', (event, folderPath) => {

  let error, folderElements;
  try{
   folderElements = getFolderFullContent(folderPath);
  }
  catch(_error){
    error = _error;
  }

  event.sender.send('folder-content-res', error, folderElements);
  
});
 
