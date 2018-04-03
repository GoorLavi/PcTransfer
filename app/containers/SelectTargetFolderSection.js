import {connect} from 'react-redux';
import SelectTargetFolderSection from '../components/SelectTargetFolderSection';
import {getDrivesList} from '../utiles/filesUtiles';
import Consts from '../consts';

const mapStateToProps = (state, ownProps) => {

  const drivesList = getDrivesList();
  return {drivesList};
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTargetFolderSection)
