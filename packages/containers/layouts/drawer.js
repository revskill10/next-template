import QlgdReportDrawer from "components/layouts/qlgd-drawer";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "data/styles";
import { compose } from "recompose";
import { closeDrawer } from "data/actions";
import { openSelector, closeSelector } from "data/selectors";
import { withRouter } from 'next/router'


/*
  - Use Router to decide the drawer to use
  - Use current role to decide to hide or not
  - API is
  (currentRoute, currentRole) => drawer | nothing
*/


const mapStateToProps = state => ({
  isOpen: openSelector(state),
  isClose: closeSelector(state)
});

const mapDispatchToProps = dispatch => ({
  handleDrawerClose: () => dispatch(closeDrawer())
});

const withDrawerState = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }), 
  withDrawerState,
)(QlgdReportDrawer);
