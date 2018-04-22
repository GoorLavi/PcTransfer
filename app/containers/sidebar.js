import {connect} from "react-redux";
import Sidebar from "../components/sidebar";

const mapStateToProps = (state, ownProps) => {
	
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

// const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
//
//   return {};
// };

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
