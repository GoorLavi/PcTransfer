import { connect } from 'react-redux';
import CloningModeComp from '../../components/modes/cloningMode';
import { initializeState } from '../../actions/contextActions';

const mapStateToProps = (state) => {

    const selectSection = state.contextReducer.section;

    return {
        currentFolder: state.contextReducer.folder.path,
        selectSection,
        cloneModeInitialized: state.contextReducer.initialized
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initializeState: dispatch(initializeState())
    } 
};

export default connect(mapStateToProps, mapDispatchToProps)(CloningModeComp)