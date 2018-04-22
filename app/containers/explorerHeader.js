import {connect} from 'react-redux';
import ExplorerHeader from '../components/explorerHeader';
import { changeToParentFolderName, goBack, changeSection } from '../actions/contextActions';
import Consts from '../consts';


const mapStateToProps = (state, ownProps) => {

    const folderPath = state.contextReducer.folder.path;

   const chosenSection = state.contextReducer.section;
    
   // Is toggle btn should be disabled
   const disableSectionBtn = _.isEmpty(state.filesReducer) && chosenSection === Consts.section.fileSection;

    return {
        folderPath,
        disableSectionBtn,
        chosenSection
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        onChangeSectionClick: (chosenSection) => {

            // Toggle section
            const toggleTo = chosenSection === Consts.section.fileSection ? Consts.section.targetFolderSection : Consts.section.fileSection;

            dispatch(changeSection(toggleTo));
        }
    }
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {

    const { chosenSection, disableSectionBtn, folderPath } = propsFromState;
    const { onExitFolderClick, onChangeSectionClick, dispatch } = propsFromDispatch;

    return {
        onChangeSectionClick: () => onChangeSectionClick(chosenSection),
        goBack: () => dispatch(goBack()),
        onGoBackToFolder: (folderName) => dispatch(changeToParentFolderName(folderName)),
        disableSectionBtn,
        folderPath
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExplorerHeader)

