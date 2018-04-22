import {connect} from 'react-redux';
import Explorer from '../components/explorer';
import Consts from '../consts';


const mapStateToProps = (state, ownProps) => {

    const folderContent = state.contextReducer.folder.content;
    
    const { loadingFolderContent } = state.contextReducer;

    return {
        folderContent,
        loadingFolderContent
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Explorer)

