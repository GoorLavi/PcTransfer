import {connect} from 'react-redux';
import ExplorerContainer from '../components/explorerContainer';
import { getFolderContent, getFile } from '../utiles/filesUtils';
import Consts from '../consts';


const mapStateToProps = (state, ownProps) => {

    let folderContent = getFolderContent(state.contextReducer.folder)
    return {
        folderContent
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerContainer)

