export default {
	sharedFolderPath: "/Users/goorlavi1/Desktop/test1",
	fsPath: "file:\\C:\\",
	mainFolderDisplayName: 'Home', // Start folder at the header folder path  
	destinationFolder: 'transferFolder',
	types: {
		dir: "directory",
		file: "file",
		img: "image"
	},
	props: {
		files: "files",
		size: "size"
	},
	section: {
		fileSection: 0,
		targetFolderSection: 1
	},
	modalTypes: {
		error: {
			id: 0,
			className: "modal-error"
		},
		copySucceed: {
			id: 1,
			className: "modal-success"
		},
		default: {
			id: 2,
			className: "modal"
		}
	}
};
