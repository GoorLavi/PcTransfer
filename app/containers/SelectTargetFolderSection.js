import { connect } from 'react-redux';
import SelectTargetFolderSection from '../components/SelectTargetFolderSection';
import Consts from '../consts';
import { startCopy } from '../managers/files-manager';
import { changeSection, copyFiles, copyFilesFinished } from '../actions/contextActions';

const mapStateToProps = (state, ownProps) => {

  const { selectedUsbDevicePath, usbDevices, loadingUsbDevices, copyingFiles } = state.contextReducer;
  const filesTree = state.filesReducer;

  return { usbDevices, selectedUsbDevicePath, filesTree, loadingUsbDevices, copyingFiles };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};


const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {

  const { usbDevices, selectedUsbDevicePath, filesTree, loadingUsbDevices, copyingFiles } = propsFromState;
  const { dispatch } = propsFromDispatch;

  return {
    onStartCopy: () => {
      dispatch(copyFiles());
      startCopy(filesTree, selectedUsbDevicePath, Consts.sharedFolderPath).then(err => {
        dispatch(copyFilesFinished(!err));
      });
    },
    goBackToFileSelection: () => dispatch(changeSection(Consts.section.fileSection)),
    usbDevices,
    selectedUsbDevicePath,
    loadingUsbDevices,
    copyingFiles
  }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SelectTargetFolderSection)
