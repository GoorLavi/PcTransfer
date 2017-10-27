import { connect } from 'react-redux';
import CloningModeComp from '../../components/modes/cloningMode';

const mapStateToProps = (state) => {


    return {
        currentFolder: state.contextReducer.folder
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CloningModeComp)