import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'components/link'
import GoogleLogin from 'components/auth/google-login'
import Footer from 'containers/layouts/footer'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
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

const NavBar = ({classes}) => {
  return (
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
        <Link href={'/'} native>HPU Portal</Link>
      </Typography>
      <Link href={'/admin'}><Button>Admin</Button></Link>
      <Link href={'/report'}><Button>Report</Button></Link>
      <Link href={'/blog'}><Button>Blog</Button></Link>
      <GoogleLogin />
    </Toolbar>
  )
}

function Pricing(props) {
  const { classes, children } = props;

  return (
    <React.Fragment>
      <AppBar position="static" color="default" className={classes.appBar}>
        <NavBar classes={classes} />
      </AppBar>
      <main className={classes.layout}>
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}


export default withStyles(styles)(Pricing);