import { withStyles } from "@material-ui/core/styles";
import AppBar from "components/layouts/app-bar";
import { connect } from "react-redux";
import styles from "data/styles";
import { compose } from "recompose";
import { openDrawer } from "data/actions";
import { openSelector, closeSelector, titleSelector } from "data/selectors";

const mapStateToProps = state => ({
  isOpen: openSelector(state),
  isClose: closeSelector(state),
  title: titleSelector(state)
});

const mapDispatchToProps = dispatch => ({
  handleDrawerOpen: () => dispatch(openDrawer())
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AppBar);
