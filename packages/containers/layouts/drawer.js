import Drawer from "components/layouts/drawer";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "data/styles";
import { compose } from "recompose";
import { closeDrawer } from "data/actions";
import { openSelector, closeSelector } from "data/selectors";

const mapStateToProps = state => ({
  isOpen: openSelector(state),
  isClose: closeSelector(state)
});

const mapDispatchToProps = dispatch => ({
  handleDrawerClose: () => dispatch(closeDrawer())
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Drawer);
