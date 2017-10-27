

export const setCloneMode = () => {

    return {
        type: 'CHANGE_MODE',
        mode:'cloneMode'
    };
};

export const setInsertMode = () => {

    return {
        type: 'CHANGE_MODE',
        mode:'insertMode'
    };
};

/**
 * Changing the main path to the sub folder
 * @param newFolderName
 * @returns {{type: string, subFolderName: *}}
 */
export const enterSubFolder = (newFolderName) => {

    return {
        type: 'ENTER_SUB_FOLDER',
        subFolderName: newFolderName
    };
};

export const exitFolder = () => {

    return {
        type: 'EXIT_FOLDER'
    };
};