// This file is shared across the demos.

import React, { Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ChartBar} from "styled-icons/fa-regular/ChartBar.cjs";
import {GrinTongueWink} from 'styled-icons/fa-regular/GrinTongueWink.cjs'
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
import routesMapFn from 'components/routes-map'

const routesMap = routesMapFn('/report')

export const MailFolderListItems = ({t}) =>
  <List>
    <ListItem button>
      <Link prefetch href={routesMap['report.v_general_report_in_week']} >
        <ListItemIcon>
          <ChartBar size={30} title={t('report.v_general_report_in_week')} />
        </ListItemIcon>
      </Link>
      <Link prefetch href={routesMap['report.v_general_report_in_week']} >
        <StyledLink>
          {t('report.v_general_report_in_week')}
        </StyledLink>
      </Link>
    </ListItem>
      <ListItem button>
        <Link prefetch href={routesMap['report.v_all_lesson_class']} >
          <ListItemIcon>
            <GrinTongueWink size={30} title={t('report.v_all_lesson_class')} />
          </ListItemIcon>
        </Link>
        <Link prefetch href={routesMap['report.v_all_lesson_class']} >
            <StyledLink>
        {t('report.v_all_lesson_class')}
        </StyledLink>
        </Link>
      </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      {t('report.v_all_teacher_do_not_finish')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      {t('report.v_all_teacher_do_not_write')}
    </ListItem>
  </List>

export const OtherMailFolderListItems = ({t}) =>
  <List>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      {t('report.v_detail_register_day_bo_sung')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      {t('report.v_detail_register_nghi_day')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('report.v_detail_student_absent_greater_20_percent')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('report.v_detail_student_absent_in_week')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('report.v_total_student_absent_department_in_week')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('report.v_total_student_absent_greater_20_percent')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('report.v_total_teacher_do_not_write_in_week')}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      {t('report.v_total_teacher_in_week')}
    </ListItem>
  </List>

const ExtendedA = withI18next(['common'])(MailFolderListItems)
const ExtendedB = withI18next(['common'])(OtherMailFolderListItems)

const QlgdDrawerItems = () =>
  <Fragment>
    <Divider />
    <ExtendedA />
    <Divider />
    <ExtendedB />
  </Fragment>

export default QlgdDrawerItems