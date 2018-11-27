import React, { Component } from 'react'
import { LocaleProvider } from 'antd-mobile'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
//import viVN from 'antd-mobile/lib/locale-provider/vi_VN'
import {withNamespaces} from 'react-i18next'

class Layout extends Component {
  render () {
    const { children, t } = this.props
    const locale = t('lng') === 'en' ? enUS : enUS

    return (
      <LocaleProvider locale={locale}>
        {children}
      </LocaleProvider>
    )
  }
}

export default withNamespaces(['common'])(Layout)
