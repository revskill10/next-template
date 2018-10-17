import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerItems from 'components/layouts/qlgd-report-drawer-data'
import {Home} from 'styled-icons/fa-solid/Home.cjs'
import {LogIn} from 'styled-icons/feather/LogIn.cjs'
import StyledUserAgent from 'components/styled-user-agent'
import {Blogger} from 'styled-icons/fa-brands/Blogger.cjs'
import {ViewModule} from 'styled-icons/material/ViewModule.cjs'
import StyledNav from 'components/styled-nav'
import { StyledNavLink } from 'components/styled-link'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, children } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <DrawerItems />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <StyledNav>
              <StyledUserAgent computer>
                <StyledNavLink href='/'>Home</StyledNavLink>
                <StyledNavLink href='/blog'>Blog</StyledNavLink>
                <StyledNavLink href='/modules'>Modules</StyledNavLink>
              </StyledUserAgent>
              <StyledUserAgent mobile>
                <StyledNavLink href='/'>
                  <Home size={30} title={'Home'} color={'white'} />
                </StyledNavLink>
                <StyledNavLink href='/blog'>
                  <Blogger size={30} title={'Blog'} color={'white'} />
                </StyledNavLink>
                <StyledNavLink href='/modules'>
                  <ViewModule size={40} title={'Modules'} color={'white'} />
                </StyledNavLink>
              </StyledUserAgent>
            </StyledNav>
            <div style={{ marginRight: '1rem'}}>
              <StyledUserAgent computer>
                <StyledNavLink href='/account'>Login</StyledNavLink>
              </StyledUserAgent>
              <StyledUserAgent mobile>
                <StyledNavLink href='/account'>
                  <LogIn size={30} title={'Login'} color={'white'} />
                </StyledNavLink>
              </StyledUserAgent>
            </div>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            {children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);