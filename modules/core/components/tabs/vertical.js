import React from 'react';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';


class ProfileTabs extends React.PureComponent {
  state = { activeIndex: 0 }

  handleChange = (_, activeIndex) => this.setState({ activeIndex })
  render() {
    const { theme } = this.props;

    const { activeIndex } = this.state;

    const primaryColor = theme.palette.primary.main;

    const style = { borderRight: `0.2em solid ${primaryColor}`, padding: '0.5em' }
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <VerticalTabs
          value={activeIndex}
          onChange={this.handleChange}
          
        >
          <MyTab label='item one' style={ activeIndex === 0 ? style : {} } />
          <MyTab label='item two' style={ activeIndex === 1 ? style : {} }/>
          <MyTab label='item three' style={ activeIndex === 2 ? style : {} } />
        </VerticalTabs>
        
        { activeIndex === 0 && <TabContainer>Item One</TabContainer> }
        { activeIndex === 1 && <TabContainer>Item Two</TabContainer> }
        { activeIndex === 2 && <TabContainer>Item Three</TabContainer> }
    </div>
    )
  }
}

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column'
  },
  indicator: {
    display: 'none',
  }
}))(Tabs)

const MyTab = withStyles(theme => ({
  selected: {
    color: 'primary',
  }
}))(Tab);

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export default withTheme()(ProfileTabs);