import {modalTypes} from "../consts";

export default class Modal {
	constructor(typeId, header, text) {

		Object.assign(this, {typeId, header, text});
	}

	getClassName() {
		const {error, copySucceed, defaultModal} = modalTypes;

		switch (this.typeId) {
			case error.id:
				return error.className;

			case copySucceed.id:
				return copySucceed.className;

			default:
				return defaultModal.className;
		}
	}
}
