import React, {Fragment} from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "containers/layouts/app-bar";
import Drawer from "containers/layouts/drawer";
import styles from "data/styles";
import { compose } from 'recompose'
import Head from 'next/head'
import Manifest from 'components/manifest'

const App = ({ classes, children, title, description }) =>
  <div className={classes.root}>
    <Head>
      <title>{ title }</title>
      <meta name="description" content={ description } />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Manifest />
    </Head>
    <AppBar />
    <Drawer />
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Fragment>
        {children}
      </Fragment>
    </main>
  </div>

export default compose(
  withStyles(styles)
)(App);
