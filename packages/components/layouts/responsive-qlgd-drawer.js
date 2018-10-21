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
import { StyledNavLink, IconLink } from 'components/styled-link'
import StyledRoot from 'components/styled-root'
import StyledContent from 'components/styled-content'
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import StyledAuthWrapper from 'components/styled-auth-wrapper'
import cookie from 'cookie'
import GoogleLogin from 'components/auth/google-login'

import i18n from 'lib/i18n';

const drawerWidth = 240;

const styles = theme => ({
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
  content1: {
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
        
        <Button variant="outlined" onClick={() => {
            const lng = i18n.languages[0] === 'vi' ? 'en' : 'vi'
            document.cookie = cookie.serialize('i18next', lng)
            i18n.changeLanguage(lng)
          }} >
          Change locale
        </Button>
        <div className={classes.toolbar} />
        <Divider />
        <DrawerItems />
      </div>
    );

    return (
      <StyledRoot>
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
                <IconLink href='/'>
                  <Home size={theme.spacing.unit * 4} title={'Home'} color={'white'} />
                </IconLink>
                <IconLink href='/blog'>
                  <Blogger size={theme.spacing.unit * 4} title={'Blog'} color={'white'} />
                </IconLink>
                <IconLink href='/modules'>
                  <ViewModule size={theme.spacing.unit * 6} title={'Modules'} color={'white'} />
                </IconLink>
              </StyledUserAgent>
            </StyledNav>
            <StyledAuthWrapper>
              <StyledUserAgent computer>
                <StyledNavLink href='/account'>
                  <GoogleLogin />
                </StyledNavLink>
              </StyledUserAgent>
              <StyledUserAgent mobile>
                <StyledNavLink href='/account'>
                  <LogIn size={30} title={'Login'} color={'white'} />
                </StyledNavLink>
              </StyledUserAgent>
            </StyledAuthWrapper>
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
        <StyledContent>
          <>
            <div className={classes.toolbar} />
            {children}
          </>
        </StyledContent>
      </StyledRoot>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);