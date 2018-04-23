import { parametersValidations } from '../utils/validationsUtils';


export const resetStore = () => {

	return { type: 'RESET_STORE' };
}

/**
 *
 * @param folderPath
 * @param isDir
 * @param name
 * @param size
 * @param type
 * @returns {{type: string, fileData: *}}
 */
export const addFile = (fileData) => {

    // Validation check
    parametersValidations(fileData, 'name', 'size', 'type');

    return {
        type: 'ADD_FILE',
        fileData: fileData
    };
};

/**
 *
 * @param filePath
 * @param fileName
 * @returns {{type: string, file: {path: *, name: *}}}
 */
export const removeFile = (filePath, fileName) => {

    return {
        type: 'REMOVE_FILE',
        file: {
            path: filePath,
            name: fileName
        }
    };
};

/**
 *
 * @param folderPath
 * @param fullFolderTree
 * @returns {{type: string, folderPath: *, fullFolderTree: *}}
 */
export const addFolderFiles = (folderPath, fullFolderTree) => {

    return {
        type: 'ADD_FOLDER_CONTENT',
        folderPath,
        fullFolderTree
    };
};

/**
 *
 * @param parentFolderPath
 * @param folderName
 * @returns {{type: string, parentFolderPath: *, folderName: *}}
 */
export const removeFolderFiles = (parentFolderPath, folderName) => {

    return {
        type: 'REMOVE_FOLDER_FILES',
        parentFolderPath,
        folderName
    };
};

