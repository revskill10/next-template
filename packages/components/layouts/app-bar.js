import classNames from "classnames"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Typography from "@material-ui/core/Typography"
import Link from 'next/link'

const Component = ({ classes, handleDrawerOpen, isOpen, isClose, title }) => (
  <AppBar
    position="absolute"
    className={classNames(classes.appBar, isOpen && classes.appBarShift)}
  >
    <Toolbar disableGutters={isClose}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={handleDrawerOpen}
        className={classNames(classes.menuButton, isOpen && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>
        <Link prefetch href='/' >
          <a style={{textDecoration: 'none', color: 'white'}}>{title}</a>
        </Link>
      </Typography>
      <Typography variant="h6" color="inherit" noWrap style={{ marginRight: '1rem'}}>
        <Link prefetch href='/account' >
          <a style={{textDecoration: 'none', color: 'white'}}>Login</a>
        </Link>
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Component;
