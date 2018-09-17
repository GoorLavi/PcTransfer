# PcTransfer - File transfer interface includes permissions that prohibit access to Windows Explorer
_Developed with Electron, React, Redux, Webpack_

I created this software allowing people to share a folder from their computer any interacter, with a secure UI, so the user will not get access to any other folders and files.

The software displays contents of a shared folder and the user will be able to mark files and folders at will.

After the file selection is finished, the user will be required to choose external memory to copy the information to it.

To set the shared folder location go through `PcTransfer/app/consts.js`
and set `sharedFolderPath` to the path you want



### the program is ready to use despit few async problems.


### To get started:
* Run `npm install`

##### Development
* Run `npm run dev` to start webpack-dev-server. Electron will launch automatically after compilation.

##### Production
_You have two options, an automatic build or two manual steps_

