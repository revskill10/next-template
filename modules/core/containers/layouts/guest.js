import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'components/link'
import Footer from 'containers/layouts/footer'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Loader from 'components/loader'
import Divider from '@material-ui/core/Divider'
import {Home} from 'styled-icons/octicons/Home.cjs'
const GoogleLogin = dynamic(import('components/auth/google-login'))
const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: 'transparent',
    },
  },
  appBar: {
    position: 'static',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: '6px',
    marginRight: '6px',
    
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: `${theme.spacing.unit * 6}px`,
    paddingLeft: `${theme.spacing.unit * 16}px`,
  },
});

const NavBarLink = styled(Link)`
 text-decoration: none;
 color: rgb(209, 72, 54);
`

const NavBar = ({classes}) => {
  return (
    <Toolbar style={{minHeight:'40px'}}>
      <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
        <NavBarLink href={'/'} native>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Home size={30} color={'primary'} title={'HPU Portal'} />
          </Typography>
        </NavBarLink>
      </Typography>
      <NavBarLink href={'/blog'}><Button>Blog</Button></NavBarLink>
      <NavBarLink href={'/feed'}><Button>Feed</Button></NavBarLink>
      <GoogleLogin />
    </Toolbar>
  )
}

function Pricing(props) {
  const { classes, children } = props;

  return (
    <div style={{fontSize: '12px'}}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <NavBar classes={classes} />
      </AppBar>
      <Divider />
      <main className={classes.layout}>
        <>
          {children}
        </>
      </main>
      <Footer classes={classes} />
    </div>
  );
}

export default withStyles(styles)(Pricing)