import React from "react";
import Drawer from "components/layouts/responsive-qlgd-drawer";
import Head from 'next/head'
import Manifest from 'components/manifest'
import styled from 'styled-components'
import Auth from 'containers/auth'

const Wrapper = styled.div`
  padding-top: 2rem;
`
class WrapperApp extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <App {...this.props} />
    )
  }
}

const App = ({ children, title, description }) =>
  <Drawer>
    <Head>
      <title>{ title }</title>
      <meta name="description" content={ description } />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Manifest />
    </Head>
    <Wrapper>
      {children}
    </Wrapper>
  </Drawer>

const AuthApp = ({children, title, description}) =>
  <Auth>
    {() => <WrapperApp title={title} description={description}>
      {children}
    </WrapperApp>}
  </Auth>

export default AuthApp
