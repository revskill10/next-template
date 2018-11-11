import AppLayout from 'containers/layout-router'
import dynamic from 'next/dynamic'
import NoSSR from 'react-no-ssr'

const IndexPage = () => {
  const Datatable = dynamic(import(/* webpackChunkName: 'datatable' */ 'components/charts/datatable'), { ssr: false })
  return (
    <AppLayout
      title='Home page'
      description='Simple things'
    >
      <>
      <NoSSR>
        <Datatable />
      </NoSSR>
      </>
    </AppLayout>
  )
}
  
export default IndexPage
