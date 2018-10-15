import AppLayout from 'containers/layouts/app'
import DndTest from 'components/dnd-test'
import NoSSR from 'react-no-ssr'

const IndexPage = () =>
  <AppLayout
    title='Home page'
    description='Simple things'
  >
  <NoSSR>
    <DndTest />
  </NoSSR>
    
  </AppLayout>

export default IndexPage
