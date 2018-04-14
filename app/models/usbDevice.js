export default class UsbDevice {

  constructor(usbDevice) {

    Object.assign(this, usbDevice);
  }

  getPath() {
    return (typeof this.mountpoint === "string") ? this.mountpoint : this.mountpoints[0].path;
  }

  isSelected(selectedUsbDevicePath) {
    return selectedUsbDevicePath === this.getPath();
  }

}
