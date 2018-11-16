import { memo, useContext } from 'react'
import convertDataToArray from 'lib/utils/convert-data-to-array'
import { compose } from 'recompose'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import withContextProvider from 'lib/hocs/with-context-provider'
import moveItemToFirst from 'lib/utils/move-item-to-first'
// layout + routing
import Layout from 'containers/layout-router'
import Grid from 'pages/report/lesson-class.grid'
// i18n 
import {
  LESSON_CLASS,
  LESSON_CLASS_KEY,
} from 'lib/i18n/translations'
// gql
import {
  FullPageQuery,
  LessonClassQuery as query, 
  LessonClassSubscription as subscription
} from 'pages/report/lesson-class.gql'
// context
import {
  LessonClassPageContext,
  MetaContext,
} from 'containers/contexts'
// shared components
import LiveComponent from 'containers/live-component'
import DataTable from 'components/datatables/mui'


export const getIndexProps = async ({apolloClient, currentUser}) => {
  if (allow(currentUser, VIEW_QLGD_REPORT)) {
    try {
      const {data} = await apolloClient.query({query: FullPageQuery})
      return {
        meta: data.meta
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const DataTableWrapper = ({t}) => {
  const {v_all_lesson_class} = useContext(LessonClassPageContext)
  const {meta} = useContext(MetaContext)
  
  const keys = meta.fields.map(item => {
    return item.name
  })

  const sortedKeys = moveItemToFirst(keys, 'tuan')
  const shownKeys = sortedKeys.slice(0, 7)
  const hiddenKeys = sortedKeys.slice(7, sortedKeys.length)
  const columns = shownKeys.map(item => {
    const tmp = `${LESSON_CLASS_KEY}.${item}`
    return t(tmp)
  }).concat(hiddenKeys.map(item => {
    const tmp = `${LESSON_CLASS_KEY}.${item}`
    return {
      name: t(tmp),
      options: {
        display: false
      }
    }
  }))

  const title=t(LESSON_CLASS)
  const data = convertDataToArray(v_all_lesson_class, sortedKeys)
  return (
    <DataTable data={data} columns={columns} title={title} />
  )
}

const Page = ({t}) => {
  const TranslatedDataTableWrapper = withNamespaces(['report'])(DataTableWrapper)
  return (
    <Layout
      title={t(LESSON_CLASS)}
      description={t(LESSON_CLASS)}
    >
      <>
        <LiveComponent
          allowedPermissions={[VIEW_QLGD_REPORT]}
          query={query}
          subscription={subscription}
          context={LessonClassPageContext}
        >
          <Grid>
            <TranslatedDataTableWrapper />
          </Grid>
        </LiveComponent>
      </>
    </Layout>
  )
}
  

export default compose(
  withContextProvider(MetaContext.Provider),
  memo,
  withNamespaces(['report'])
)(Page)
