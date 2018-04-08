import {connect} from 'react-redux';
import DeviceElement from '../components/deviceElement';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {

  // Find the device on store by path
  const usbDevice = _.find(state.contextReducer.usbDevices, (usbDevice) => {
    return usbDevice.getPath() === ownProps.path;
  })

  return {usbDevice};
};

const mapDispatchToProps = (dispatch) => {

  return {
    onClick: () => {}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceElement)
