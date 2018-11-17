import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ChartBar} from "styled-icons/fa-regular/ChartBar.cjs";
import {GrinTongueWink} from 'styled-icons/fa-regular/GrinTongueWink.cjs'
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/Report";
import List from "@material-ui/core/List";
import {StyledBarLink} from 'components/styled-link'
import Authorization from 'containers/authorization'
import { withNamespaces } from 'react-i18next';

import {
  GENERAL_REPORT_IN_WEEK,
  LESSON_CLASS,
  UNFINISHED_TEACHER,
  UNWRITTEN_TEACHER,
  ADDITIONAL_HOUR,
  RETIRE,
  ABSENT_STUDENT,
  DETAIL_ABSENT_STUDENT,
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
      <Authorization allowedPermissions={[VIEW_QLGD_REPORT]}>
        <ListItem button>
          <StyledBarLink href={'/report/unfinished_teacher'}>
            <ListItemIcon>
              <GrinTongueWink size={30} title={t(UNFINISHED_TEACHER)} />
            </ListItemIcon>
          </StyledBarLink>
          <StyledBarLink href={'/report/unfinished_teacher'}>{t(UNFINISHED_TEACHER)}</StyledBarLink>
        </ListItem>
      </Authorization>    
      <Authorization allowedPermissions={[VIEW_QLGD_REPORT]}>
        <ListItem button>
          <StyledBarLink href={'/report/unwritten_teacher'}>
            <ListItemIcon>
              <GrinTongueWink size={30} title={t(UNWRITTEN_TEACHER)} />
            </ListItemIcon>
          </StyledBarLink>
          <StyledBarLink href={'/report/unwritten_teacher'}>{t(UNWRITTEN_TEACHER)}</StyledBarLink>
        </ListItem>
      </Authorization> 
      <Authorization allowedPermissions={[VIEW_QLGD_REPORT]}>
        <ListItem button>
          <StyledBarLink href={'/report/additional_hour'}>
            <ListItemIcon>
              <GrinTongueWink size={30} title={t(ADDITIONAL_HOUR)} />
            </ListItemIcon>
          </StyledBarLink>
          <StyledBarLink href={'/report/additional_hour'}>{t(ADDITIONAL_HOUR)}</StyledBarLink>
        </ListItem>
      </Authorization> 
      <Authorization allowedPermissions={[VIEW_QLGD_REPORT]}>
        <ListItem button>
          <StyledBarLink href={'/report/additional_hour'}>
            <ListItemIcon>
              <GrinTongueWink size={30} title={t(RETIRE)} />
            </ListItemIcon>
          </StyledBarLink>
          <StyledBarLink href={'/report/retire'}>{t(RETIRE)}</StyledBarLink>
        </ListItem>
      </Authorization> 
      <Authorization allowedPermissions={[VIEW_QLGD_REPORT]}>
        <ListItem button>
          <StyledBarLink href={'/report/absent_student'}>
            <ListItemIcon>
              <GrinTongueWink size={30} title={t(ABSENT_STUDENT)} />
            </ListItemIcon>
          </StyledBarLink>
          <StyledBarLink href={'/report/absent_student'}>{t(ABSENT_STUDENT)}</StyledBarLink>
        </ListItem>
      </Authorization> 
      <Authorization allowedPermissions={[VIEW_QLGD_REPORT]}>
        <ListItem button>
          <StyledBarLink href={'/report/detail_absent_student'}>
            <ListItemIcon>
              <GrinTongueWink size={30} title={t(DETAIL_ABSENT_STUDENT)} />
            </ListItemIcon>
          </StyledBarLink>
          <StyledBarLink href={'/report/detail_absent_student'}>{t(DETAIL_ABSENT_STUDENT)}</StyledBarLink>
        </ListItem>
      </Authorization> 
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
