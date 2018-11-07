import React from 'react'
import {withAlerts} from 'data/selectors'
import {Alerts} from 'mui-redux-alerts'
class WithServiceWorker extends React.Component {
  componentDidMount() {
    const { openAlert } = this.props
    if ("serviceWorker" in navigator) {      
      navigator.serviceWorker.register("/sw.js")
      .catch(err => openAlert(`Service worker registration failed ${err}`, 2000))
    } else {
      openAlert("Service worker not supported", 2000)
    }
  }
  render() {
    const {children, alerts} = this.props
    return (
      <>
      {children}
      <Alerts alerts={alerts} />
      </>
    )
  }
}

export default withAlerts(WithServiceWorker)
