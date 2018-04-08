import {connect} from 'react-redux';
import SelectTargetFolderSection from '../components/SelectTargetFolderSection';
import Consts from '../consts';

const mapStateToProps = (state, ownProps) => {

  const usbDevices = state.contextReducer.usbDevices;

  return {usbDevices};
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTargetFolderSection)
