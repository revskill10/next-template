import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { navigate } from 'components/calendars/constants'
import { DatePicker } from 'material-ui-pickers';
import {HandPointLeft} from 'styled-icons/fa-regular/HandPointLeft.cjs'
import {HandPointRight} from 'styled-icons/fa-regular/HandPointRight.cjs'
class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.node.isRequired,
    localizer: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
  }

  state = {
    selectedDate: this.props.date
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date }, () => {
      this.props.onNavigate(navigate.DATE, date)
    });
  };

  constructor(props) {
    super(props)
    console.log(JSON.stringify(props))
  }

  render() {
    let { localizer: { messages }, label } = this.props
    const { selectedDate } = this.state;


    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {messages.previous}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </button>
        </span>

        <span className="rbc-toolbar-label">{label}</span>
        <DatePicker
            label={label}
            showTodayButton
            maxDateMessage="Date must be less than today"
            value={selectedDate}
            onChange={this.handleDateChange}
            leftArrowIcon={<HandPointLeft size={30} color={'rgb(209, 72, 54)'} title={'Previous month'} />}
            rightArrowIcon={<HandPointRight size={30} color={'rgb(209, 72, 54)'} title={'Previous month'} />}
          />

        <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={cn({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

export default Toolbar