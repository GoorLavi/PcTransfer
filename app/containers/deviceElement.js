import {connect} from 'react-redux';
import DeviceElement from '../components/deviceElement';
import _ from 'lodash';
import {manageUsbDeviceClick} from '../actions/contextActions';
import {startCopy} from '../managers/files-managers';
import Consts from '../consts';

const mapStateToProps = (state, ownProps) => {

  const context = state.contextReducer;

  // Find the device on store by path
  const usbDevice = _.find(context.usbDevices, (usbDevice) => {
    return usbDevice.getPath() === ownProps.path;
  })

  const isChosen = usbDevice.isSelected(context.selectedUsbDevicePath);
  const filesTree = state.filesReducer;
  return {usbDevice, isChosen, filesTree};
};

const mapDispatchToProps = (dispatch) => {

  return {
    onClick: (usbDevice) => {
      dispatch(manageUsbDeviceClick(usbDevice.getPath()));

    }
  }
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {

  const {usbDevice, isChosen} = propsFromState;

  return {
    onClick: () => {
      propsFromDispatch.onClick(usbDevice);
      startCopy(propsFromState.filesTree, propsFromState.usbDevice.getPath(), Consts.sharedFolderPath);
    },
    usbDevice,
    isChosen
  }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DeviceElement)
