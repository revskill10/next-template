import React from "react";
import Drawer from "components/layouts/app";
import Head from 'next/head'
import Manifest from 'components/manifest'
import styled from 'styled-components'
import Authentication from 'containers/authentication'

const Wrapper = styled.div`
  padding-top: 2rem;
`

const App = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ description } />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Manifest />
      </Head>
      <Authentication>
        <Drawer>
          <Wrapper>
            {children}
          </Wrapper>
        </Drawer>
      </Authentication>
    </>
  )
}

export default App
