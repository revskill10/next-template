import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function AutoGrid(props) {
  const { classes, left, middle, right, children } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs>
          <Paper className={classes.paper}>{left}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>{middle}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>{right}</Paper>
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        <Grid item xs>
          <Paper className={classes.paper}>{children}</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

AutoGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  left: PropTypes.element,
  middle: PropTypes.element,
  right: PropTypes.element
};

export default withStyles(styles)(AutoGrid);