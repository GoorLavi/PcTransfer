export default {
	sharedFolderPath: "/Users/goorlavi1/Documents/pc-transfer/",
	fsPath: "file:\\C:\\",
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
