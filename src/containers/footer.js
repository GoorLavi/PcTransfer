import {connect} from 'react-redux';
import Footer from '../components/footer';
import { exitFolder } from '../actions/contextActions';


const mapStateToProps = (state, ownProps) => {


    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onExitFolderClick: () => {

            dispatch(exitFolder());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer)