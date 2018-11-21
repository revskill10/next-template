import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';

const cleanAndOrder = obj => Object.keys(obj)
  .map(key => ({ open: true, key, ...obj[key] }))
  .sort((a, b) => (a.timestamp - b.timestamp))
  .map((_p) => { const p = _p; delete p.timestamp; return p; });



const Alerts = ({ alerts }) => (
  <div>
    {cleanAndOrder(alerts.snackbars).map(p => (
      <Snackbar anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }} {...p} />)
    )}
    {cleanAndOrder(alerts.dialogs).map(p => (<Dialog {...p} />))}
  </div>
);

Alerts.propTypes = {
  alerts: PropTypes.shape({
    dialogs: PropTypes.object.isRequired,
    snackbars: PropTypes.object.isRequired,
  }).isRequired,
};

export default Alerts;
