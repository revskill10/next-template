import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const IconLabelTabs = ({classes, memberships, permissions, roles}) => {
  const [value, setValue] = useState(0)

  const onChange = (event, value) => {
    setValue(value)
  }

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={onChange}
        fullWidth
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab icon={<PhoneIcon />} label="Memberships" />
        <Tab icon={<FavoriteIcon />} label="Permissions" />
        <Tab icon={<PersonPinIcon />} label="Roles" />
      </Tabs>
      {value === 0 && <TabContainer>{memberships}</TabContainer>}
      {value === 1 && <TabContainer>{permissions}</TabContainer>}
      {value === 2 && <TabContainer>{roles}</TabContainer>}
    </Paper>
  );
}

export default withStyles(styles)(IconLabelTabs);