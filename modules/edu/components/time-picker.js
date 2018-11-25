import React, { PureComponent } from 'react';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
// new Date(year, month, day, hours, minutes, seconds, milliseconds)
export default class BasicUsage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: new Date(1970, 1, 1, props.time.split(':')[0], props.time.split(':')[1]),
    };
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="picker">
        <TimePicker
          ampm={false}
          label={this.props.time}
          value={selectedDate}
          onChange={this.handleDateChange}
          disableOpenOnEnter
        />
      </div>
      </MuiPickersUtilsProvider>
    );
  }
}