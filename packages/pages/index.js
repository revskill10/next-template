import AppLayout from 'containers/layout-router'
import DndTest from 'components/dnd-test'
import dynamic from 'next/dynamic'
import NoSSR from 'react-no-ssr'
const IndexPage = () => {
  const Datatable = dynamic(import('components/charts/datatable'))
  return (
    <AppLayout
      title='Home page'
      description='Simple things'
    >
      <>
      <NoSSR>
      <Datatable />
      </NoSSR>
      <DndTest />
      </>
    </AppLayout>
  )
}
  

export default IndexPage
