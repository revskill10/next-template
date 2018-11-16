import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ChartBar} from "styled-icons/fa-regular/ChartBar.cjs";
import {GrinTongueWink} from 'styled-icons/fa-regular/GrinTongueWink.cjs'
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/Report";
import List from "@material-ui/core/List";
import {StyledBarLink} from 'components/styled-link'
import Authorization from 'containers/authorization'
import { withNamespaces } from 'react-i18next';

import {
  GENERAL_REPORT_IN_WEEK,
  LESSON_CLASS,
} from 'lib/i18n/translations'

import {
  VIEW_QLGD_REPORT
} from 'lib/policies'

const ReportSideBar = ({t}) => {
  return (
    <List>
      <Authorization allowedPermissions={[VIEW_QLGD_REPORT]}>
        <ListItem button>
          <StyledBarLink href={'/report'}>
            <ListItemIcon>
              <ChartBar size={30} title={t(GENERAL_REPORT_IN_WEEK)} />
            </ListItemIcon>
          </StyledBarLink>
          <StyledBarLink href={'/report'}>{t(GENERAL_REPORT_IN_WEEK)}</StyledBarLink>
        </ListItem>
      </Authorization>
      <Authorization allowedPermissions={[VIEW_QLGD_REPORT]}>
        <ListItem button>
          <StyledBarLink href={'/report/lesson_class'}>
            <ListItemIcon>
              <GrinTongueWink size={30} title={t(LESSON_CLASS)} />
            </ListItemIcon>
          </StyledBarLink>
          <StyledBarLink href={'/report/lesson_class'}>{t(LESSON_CLASS)}</StyledBarLink>
        </ListItem>
      </Authorization>      
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
  )
}

export default withNamespaces(['report'])(ReportSideBar)
