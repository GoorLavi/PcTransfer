import { connect } from 'react-redux';
import CloningModeComp from '../../components/modes/cloningMode';

const mapStateToProps = (state) => {

    const selectSection = state.contextReducer.section;

    return {
        currentFolder: state.contextReducer.folder,
        selectSection
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CloningModeComp)