export default class UsbDevice {

  constructor(usbDevice) {

    Object.assign(this, usbDevice);
  }

  getPath() {
    return this.mountpoints[0].path;
  }

  isSelected(context) {}

}
