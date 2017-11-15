import {connect} from 'react-redux';
import Footer from '../components/footer';
import Consts from '../consts';
import { exitFolder, changeSection } from '../actions/contextActions';
import _ from 'lodash';


const mapStateToProps = (state, ownProps) => {

      const chosenSection = state.contextReducer.section;

      // Is toggle btn should be disabled
    const disableSectionBtn = _.isEmpty(state.filesReducer) && chosenSection === Consts.section.fileSection;

    return {
        chosenSection,
        disableSectionBtn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onExitFolderClick: () => {

            dispatch(exitFolder());
        },
        onChangeSectionClick: (chosenSection) => {

            // Toggle section
            const toggleTo = chosenSection === Consts.section.fileSection ? Consts.section.targetFolderSection : Consts.section.fileSection;

            dispatch(changeSection(toggleTo));
        }
    }
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {

    const { chosenSection, disableSectionBtn } = propsFromState;
    const { onExitFolderClick } = propsFromDispatch;

    return {
        onChangeSectionClick: () => propsFromDispatch.onChangeSectionClick(chosenSection),
        onExitFolderClick,
        chosenSection,
        disableSectionBtn
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Footer)