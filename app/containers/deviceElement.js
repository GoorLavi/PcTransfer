import {connect} from 'react-redux';
import DeviceElement from '../components/deviceElement';
import _ from 'lodash';
import {manageUsbDeviceClick} from '../actions/contextActions';

const mapStateToProps = (state, ownProps) => {

  const context = state.contextReducer;

  // Find the device on store by path
  const usbDevice = _.find(context.usbDevices, (usbDevice) => {
    return usbDevice.getPath() === ownProps.path;
  })

  const isChosen = usbDevice.isSelected(context.selectedUsbDevicePath);

  return {usbDevice, isChosen};
};

const mapDispatchToProps = (dispatch) => {

  return {
    onClick: (usbDevice) => {
      dispatch(manageUsbDeviceClick(usbDevice.getPath()))
    }
  }
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {

  const {usbDevice, isChosen} = propsFromState;

  return {
    onClick: () => propsFromDispatch.onClick(usbDevice),
    usbDevice,
    isChosen
  }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DeviceElement)
