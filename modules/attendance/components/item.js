import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import LazyLoad from 'react-lazyload';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

function ComplexGrid(props) {
  const { classes, } = props;
  return (
    <Paper className={classes.root}>
      <Grid container spacing={16}>
        <Grid item>
          <LazyLoad height={128} offset={100}>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="https://material-ui.com/static/images/grid/complex.jpg" />
            </ButtonBase>
          </LazyLoad>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                Standard license
              </Typography>
              <Typography gutterBottom>Full resolution 1920x1080 • JPEG</Typography>
              <Typography color="textSecondary">ID: 1030114</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">$19.00</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);