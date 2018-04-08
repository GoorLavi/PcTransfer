import React, {Component} from 'react';
import Consts from '../consts';
import {Col, Thumbnail} from 'react-bootstrap';
import UsbDevice from '../assets/images/Usb.ico';

export default class deviceElement extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {};

  render() {

    const usbDevice = this.props.usbDevice;

    return (<Col className="explorer-col" xs={3} onClick={() => onClick()}>
      <Thumbnail className="image-thumbnail-element" src={UsbDevice} alt="242x200">
        {usbDevice.getPath()}
      </Thumbnail>
    </Col>);
  }
}
