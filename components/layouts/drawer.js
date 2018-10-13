import React from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { mailFolderListItems, otherMailFolderListItems } from "components/tile-data";

const Component = ({ classes, theme, isOpen, isClose, handleDrawerClose }) => (
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
    <div className={classes.toolbar}>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </div>
    <Divider />
    <List>{mailFolderListItems}</List>
    <Divider />
    <List>{otherMailFolderListItems}</List>
  </Drawer>
);

export default Component;
