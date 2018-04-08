import React, {Component} from 'react';
import Consts from '../consts';
import {Col, Thumbnail} from 'react-bootstrap';
import UsbDevice from '../assets/images/Usb.ico';

export default class deviceElement extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {usbDevice, onClick, isChosen} = this.props;

    const className = 'image-thumbnail-element' + (
      isChosen
      ? ' selected-usb-device-thumbnail'
      : '')

    return (<Col className="explorer-col" xs={3} onClick={() => onClick()}>
      <Thumbnail className={className} src={UsbDevice} alt="242x200">
        {usbDevice.getPath()}
      </Thumbnail>
    </Col>);
  }
}
