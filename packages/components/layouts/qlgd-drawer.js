import React, {Fragment} from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DrawerItems from 'components/layouts/qlgd-report-drawer-data'

const QlgdReportDrawer = ({ classes, theme, isOpen, isClose, handleDrawerClose }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(
        classes.drawerPaper,
        isClose && classes.drawerPaperClose
      )
    }}
    open={isOpen}
  >
    <Fragment>
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <DrawerItems />
    </Fragment>
  </Drawer>
);

export default QlgdReportDrawer;
