import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import i18n from 'lib/i18n'

const LanguageSwitch = ({ router, className }) => (
  <div className={className}>
    <ul >
      <li>
        <Link href={`${router.pathname}`}>
          <a onClick={() => i18n.changeLanguage('en')}>en</a>
        </Link>
      </li>
      <li>
        <Link href={`${router.pathname}?lng=vi`}>
          <a onClick={() => i18n.changeLanguage('vi')}>vi</a>
        </Link>
      </li>
    </ul>
  </div>
)

const StyledLanguageSwitch = styled(LanguageSwitch)`
  ul {
    margin-top: 1px;
  }
`

export default withRouter(StyledLanguageSwitch)