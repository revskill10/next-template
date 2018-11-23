import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  root: {
    flexGrow: 1,
    background: 'transparent',
    boxShadow: 'none',
  },
};

const CenteredTabs = ({classes, items}) => {
  let Container = null
  const [value, setValue] = useState(0)

  const handleChange = useCallback((e, v) => {
    setValue(v)
  })
  const headers = items.map((item, index) => {
    return <Tab key={`tab-${index}`} label={item.label} />
  })
  
  Container = items[value].component

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        style={
          {paddingBottom: '24px', fontSize: '3px'}
        }
        centered
      >
        {headers}
      </Tabs>
      {Container && <Container />}
    </Paper>
  )
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);