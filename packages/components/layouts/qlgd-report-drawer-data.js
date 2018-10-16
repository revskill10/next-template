// This file is shared across the demos.

import React, { Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Link from 'next/link'
import StyledLink from 'components/styled-link'
import routesMap from 'components/routes-map'
import { withI18next } from 'lib/with-i18next'
import {SupervisorAccount} from 'styled-icons/material/SupervisorAccount.cjs'
import {ChartBar} from 'styled-icons/fa-regular/ChartBar.cjs'
import styled from 'styled-components'

const StyledIcon = styled.div`
  padding-right: 4px;
`

export const MailFolderListItems = ({t}) =>
  <List>
    <ListItem button>
      <StyledIcon>
        <ChartBar size="30" title={t('v_general_report_in_week')} />
      </StyledIcon>
      <Link prefetch href={routesMap['v_general_report_in_week']} >
        <StyledLink>
          {t('v_general_report_in_week')}
        </StyledLink>
      </Link>
    </ListItem>
    <ListItem button>
      <StyledIcon>
        <SupervisorAccount size="30" title={t('v_all_lesson_class')} />
      </StyledIcon>
      <Link prefetch href={routesMap['v_all_lesson_class']} >
        <StyledLink>
          {t('v_all_lesson_class')}
        </StyledLink>
      </Link>
    </ListItem>
  </List>
  
const Extended = withI18next(['report'])(MailFolderListItems)
const QlgdDrawerItems = () =>
  <Fragment>
    <Divider />
    <Extended />
    <Divider />
  </Fragment>
export default QlgdDrawerItems