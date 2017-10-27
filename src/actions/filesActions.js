/**
 *
 * @param filePath
 * @param fileName
 * @returns {{type: string, file: {path: *, name: *}}}
 */
export const addFile = (filePath, fileName) => {

    return {
        type: 'ADD_FILE',
        file: {
            path: filePath,
            name: fileName
        }
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
 * @param filesPath
 * @param filesNames
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

