import React from "react";
import styled from 'styled-components'
import Head from 'next/head'
import Manifest from 'components/manifest'

const Wrapper = styled.div`
  padding-top: 2rem;
`

const withHead = Drawer => ({ title, description, meta, children }) => {
  return (
    <>
    <Head>
      <title>{ title }</title>
      <meta name="description" content={ description } />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Manifest />
      {meta}
    </Head>
    <Drawer>
      <Wrapper>
        {children}
      </Wrapper>
    </Drawer>
    </>
  )
}

export default withHead
