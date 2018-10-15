import React, {Fragment} from "react";
import Drawer from "components/layouts/responsive-qlgd-drawer";
import Head from 'next/head'
import Manifest from 'components/manifest'

const App = ({ children, title, description }) =>
  <Drawer>
    <Fragment>
    <Head>
      <title>{ title }</title>
      <meta name="description" content={ description } />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Manifest />
    </Head>
    {children}
    </Fragment>
  </Drawer>

export default App;
