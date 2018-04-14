import {connect} from "react-redux";
import Modal from "../components/modal";
import {closeModal} from "../actions/contextActions";

const mapStateToProps = (state, ownProps) => {
	const modal = state.contextReducer.modal;

	return {modal};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () => {
			dispatch(closeModal());
		}
	};
};

// const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
//
//   return {};
// };
// mergeProps
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
