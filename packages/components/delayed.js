import React from 'react';
import PropTypes from 'prop-types';
import SmoothCollapse from 'react-smooth-collapse'

class Delayed extends React.Component {

  constructor(props) {
      super(props);
      this.state = {hidden : true};
  }

  componentDidMount() {
      setTimeout(() => {
          this.setState({hidden: false});
      }, this.props.waitBeforeShow);
  }

  render() {
    const { children } = this.props
    return (
      <SmoothCollapse expanded={!this.state.hidden}>
        {children}
      </SmoothCollapse>
    )
  }
}

Delayed.propTypes = {
  waitBeforeShow: PropTypes.number.isRequired
};

export default Delayed;

/*
import Delayed from '../Time/Delayed';
 import React from 'react';

 const myComp = props => (
     <Delayed waitBeforeShow={500}>
         <div>Some child</div>
     </Delayed>
 )
*/