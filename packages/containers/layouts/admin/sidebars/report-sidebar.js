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

const ReportSideBar = ({t}) => {
  return (
    <List>
      <Authorization allowedPermissions={['view:qlgd_report']}>
        <ListItem button>
          <StyledBarLink href={'/report'}>
            <ListItemIcon>
              <ChartBar size={30} title={t('report.v_general_report_in_week')} />
            </ListItemIcon>
          </StyledBarLink>
          <StyledBarLink href={'/report'}>{t('report.v_general_report_in_week')}</StyledBarLink>
        </ListItem>
      </Authorization>
      <Authorization allowedPermissions={['view:report.v_all_lesson_class']}>
        <ListItem button>
          <StyledBarLink href={'/report/lesson_class'}>
            <ListItemIcon>
              <GrinTongueWink size={30} title={t('report.v_all_lesson_class')} />
            </ListItemIcon>
          </StyledBarLink>
          <StyledBarLink href={'/report/lesson_class'}>{t('report.v_all_lesson_class')}</StyledBarLink>
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
