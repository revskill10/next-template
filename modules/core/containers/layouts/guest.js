import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'components/link'
import GoogleLogin from 'components/auth/google-login'
import Footer from 'containers/layouts/footer'
import styled from 'styled-components'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
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
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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
});

const NavBarLink = styled(Link)`
 text-decoration: none;
 color: rgb(209, 72, 54);
`

const NavBar = ({classes}) => {
  return (
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
        <NavBarLink href={'/'} native>HPU Portal</NavBarLink>
      </Typography>
      <NavBarLink href={'/admin'}><Button>Admin</Button></NavBarLink>
      <NavBarLink href={'/report'}><Button>Report</Button></NavBarLink>
      <NavBarLink href={'/blog'}><Button>Blog</Button></NavBarLink>
      <GoogleLogin />
    </Toolbar>
  )
}

function Pricing(props) {
  const { classes, children } = props;

  return (
    <React.Fragment>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <NavBar classes={classes} />
      </AppBar>
      <main className={classes.layout}>
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default withStyles(styles)(Pricing)