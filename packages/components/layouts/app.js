import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerItems from 'components/layouts/side-bar'
import StyledRoot from 'components/styled-root'
import StyledContent from 'components/styled-content'
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import StyledAuthWrapper from 'components/styled-auth-wrapper'
import cookie from 'cookie'
import GoogleLogin from 'components/auth/google-login'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import NavBar from 'components/layouts/nav-bar'
import styles from 'components/layouts/styles'
import i18n from 'lib/i18n';
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()
const {FB_PAGE_ID, FB_APP_ID, FB_MESSENGER} = publicRuntimeConfig

const Layout = ({classes, theme, children}) => {
  const [mobileOpen, toggle] = useState(false)

  const handleDrawerToggle = () => {
    toggle(true)
  };

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
            onClick={handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <NavBar />
          <StyledAuthWrapper>
            <GoogleLogin />
          </StyledAuthWrapper>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
          {FB_MESSENGER ? <MessengerCustomerChat
            pageId={FB_PAGE_ID}
            appId={FB_APP_ID}
          /> : <></>}
        </>
      </StyledContent>
    </StyledRoot>
  );
}

export default withStyles(styles, { withTheme: true })(Layout);