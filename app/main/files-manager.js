import {ipcMain} from 'electron';
import copyFilesTree from 'copy-files-tree';
import _ from 'lodash';


ipcMain.on('copy-files', function(event, {filesTree, sourcePath, selectedDevice}) {


  const error = copyFilesTree(filesTree, sourcePath, selectedDevice+'\\testFolder')

  console.log(error);
  
  event.sender.send('copy-files-finished', error);

});
