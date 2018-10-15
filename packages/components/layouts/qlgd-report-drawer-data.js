// This file is shared across the demos.

import React, { Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import StarIcon from "@material-ui/icons/Star";
import SendIcon from "@material-ui/icons/Send";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/Report";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { withI18next } from 'lib/with-i18next'
import Tooltip from '@material-ui/core/Tooltip';
import Link from 'next/link'
import StyledLink from 'components/styled-link'
import routesMap from 'components/routes-map'

export const MailFolderListItems = ({t}) =>
  <Fragment>
    <Tooltip title={t('v_general_report_in_week')}>
      <ListItem button>
        <Link prefetch href={routesMap['v_general_report_in_week']} >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
        </Link>
        <Link prefetch href={routesMap['v_general_report_in_week']} >
          <StyledLink>
            {t('v_general_report_in_week')}
          </StyledLink>
        </Link>
      </ListItem>
    </Tooltip>
    <Tooltip title={t('v_all_lesson_class')}>
      <ListItem button>
        <Link prefetch href={routesMap['v_all_lesson_class']} >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
        </Link>
        <Link prefetch href={routesMap['v_all_lesson_class']} >
            <StyledLink>
        {t('v_all_lesson_class')}
        </StyledLink>
        </Link>
      </ListItem>
    </Tooltip>
    
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      {t('v_all_teacher_do_not_finish')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      {t('v_all_teacher_do_not_write')}
    </ListItem>
  </Fragment>

export const OtherMailFolderListItems = ({t}) =>
  <Fragment>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      {t('v_detail_register_day_bo_sung')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      {t('v_detail_register_nghi_day')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('v_detail_student_absent_greater_20_percent')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('v_detail_student_absent_in_week')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('v_total_student_absent_department_in_week')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('v_total_student_absent_greater_20_percent')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('v_total_teacher_do_not_write_in_week')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('v_total_teacher_in_week')}
    </ListItem>
  </Fragment>

const QlgdDrawerItems = ({t}) =>
  <Fragment>
    <Divider />
    <List><MailFolderListItems t={t} /></List>
    <Divider />
    <List><OtherMailFolderListItems t={t} /></List>
  </Fragment>

export default withI18next(['report'])(QlgdDrawerItems)