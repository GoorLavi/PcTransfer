import React from 'react';
import _ from 'lodash';
import DeviceElement from '../containers/deviceElement';
import { Button, Glyphicon } from 'react-bootstrap';
import { RotateLoader } from 'react-spinners';



class selectTargetFolder extends React.Component {

  getDrivesList(usbDevices) {

    return _.map(usbDevices, (val, key) => {

      const path = val.getPath();
      return (<DeviceElement key={path} path={path}></DeviceElement>)
    });
  }

  render() {

    const { selectedUsbDevicePath, usbDevices, onStartCopy, loadingUsbDevices, goBackToFileSelection, copyingFiles } = this.props;

    const drivesList = this.getDrivesList(usbDevices)

    return (
      <div id="devices_container">
        <Button id="back_to_file_selection_btn" onClick={() => goBackToFileSelection()}>
          <Glyphicon glyph="menu-left" />
          Go Back </Button>

        <div id="devices_action_description">
          <h2>Please select a usb device</h2>
          <h4>which you want to transfer the files into</h4>
        </ div>

        <div id="devices_list">
          {loadingUsbDevices || copyingFiles ? <RotateLoader color={'#337ab7'} loading={true} /> : drivesList}
        </ div>

        <Button onClick={() => onStartCopy()} disabled={!selectedUsbDevicePath} id="start_copy_btn">Copy Files</Button>
      </ div>
    );
  }
}

export default selectTargetFolder;



