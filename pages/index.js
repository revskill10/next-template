import React from 'react'
import AppLayout from 'containers/layouts/app'
import Report from 'modules/report'
import { compose } from 'recompose'
import { withI18next } from 'lib/with-i18next'
import getIndexData from 'pages/index'
import withInitialProps from 'lib/with-initial-props'

const Index = ({t, data}) =>
  <AppLayout
    title={t ? t('title.home') : 'Home' }
    description={t ? t('description.home') : 'HPU Reporting'}
  >        
    <Report data={data} />
  </AppLayout>

export default compose(
  withInitialProps(getIndexData),
  withI18next(['common']),  
)(Index)