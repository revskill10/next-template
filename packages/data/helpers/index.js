import { connect } from "react-redux";
import { closeDrawer, openDrawer } from "data/actions";
import { openSelector, closeSelector } from "data/selectors";

/*
  - Use Router to decide the drawer to use
  - Use current role to decide to hide or not
  - API is
  (currentRoute, currentRole) => drawer | nothing
*/


const mapStateToProps = state => ({
  isOpen: openSelector(state),
  isClose: closeSelector(state),
});

const mapDispatchToProps = dispatch => ({
  handleDrawerClose: () => dispatch(closeDrawer()),
  handleDrawerOpen: () => dispatch(openDrawer()),
});

export const withDrawerState = connect(
  mapStateToProps,
  mapDispatchToProps
)
