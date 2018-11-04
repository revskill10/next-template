import React from "react";
import styled from 'styled-components'
import Authentication from 'containers/authentication'
import Head from 'next/head'
import Manifest from 'components/manifest'

const Wrapper = styled.div`
  padding-top: 2rem;
`

const withAuth = Drawer => ({ title, description, children }) => {
  return (
    <Authentication>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ description } />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Manifest />
      </Head>
      <Drawer>
        <Wrapper>
          {children}
        </Wrapper>
      </Drawer>
    </Authentication>
  )
}

export default withAuth
