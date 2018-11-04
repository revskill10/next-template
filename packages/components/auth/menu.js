import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {StyledProfileLink} from 'components/styled-link'
import {AccountCircle} from 'styled-icons/material/AccountCircle.cjs'

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { children} = this.props

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <AccountCircle size={30} color={'white'} />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>
            <StyledProfileLink href='/profile'>
              <Button variant="contained" color="primary">Profile</Button>
            </StyledProfileLink>
          </MenuItem>
          <MenuItem>{children}</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;