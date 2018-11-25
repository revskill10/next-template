import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { navigate } from 'components/calendars/constants'
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import {HandPointLeft} from 'styled-icons/fa-regular/HandPointLeft.cjs'
import {HandPointRight} from 'styled-icons/fa-regular/HandPointRight.cjs'
import {withNamespaces} from 'react-i18next'
import DateFnsUtils from '@date-io/date-fns';
let locale = require('date-fns/locale/vi')

class Toolbar extends React.Component {
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
    const {t} = props
    if (t('lng') === 'en') {
      locale = require('date-fns/locale/en-US')
    }
  }

  render() {
    let { localizer: { messages }, label, t } = this.props
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
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
          <div className="picker">
            <DatePicker
              label={label}
              showTodayButton
              format="dd/MM/yyyy"
              placeholder="10/10/2018"
              // handle clearing outside => pass plain array if you are not controlling value outside
              mask={value =>
                value
                  ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
                  : []
              }
              value={selectedDate}
              onChange={this.handleDateChange}
              disableOpenOnEnter
              animateYearScrolling={false}
              leftArrowIcon={<HandPointLeft size={30} color={'rgb(209, 72, 54)'} title={'Previous month'} />}
              rightArrowIcon={<HandPointRight size={30} color={'rgb(209, 72, 54)'} title={'Previous month'} />}
            />
          </div>
        </MuiPickersUtilsProvider>

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

export default withNamespaces(['common'])(Toolbar)