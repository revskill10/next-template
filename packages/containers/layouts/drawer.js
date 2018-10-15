import QlgdReportDrawer from "components/layouts/qlgd-drawer";
import { withStyles } from "@material-ui/core/styles";
import styles from "data/styles";
import { compose } from "recompose";
import { withRouter } from 'next/router'
import { withDrawerState } from 'data/helpers'

/*
  - Use Router to decide the drawer to use
  - Use current role to decide to hide or not
  - API is
  (currentRoute, currentRole) => drawer | nothing
*/



export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }), 
  withDrawerState,
)(QlgdReportDrawer);
