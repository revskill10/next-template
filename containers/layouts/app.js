import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "containers/layouts/app-bar";
import Drawer from "containers/layouts/drawer";
import styles from "data/styles";
import { compose } from 'recompose'

const App = ({ classes, children }) =>
  <div className={classes.root}>
    <AppBar />
    <Drawer />
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  </div>

export default compose(
  withStyles(styles)
)(App);
