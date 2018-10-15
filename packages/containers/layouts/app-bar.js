import { withStyles } from "@material-ui/core/styles";
import AppBar from "components/layouts/app-bar";
import styles from "data/styles";
import { compose } from "recompose";
import { withDrawerState } from 'data/helpers'

export default compose(
  withStyles(styles, { withTheme: true }),
  withDrawerState,
)(AppBar);
