import Post from 'modules/blog/post-1.md'
import AppLayout from 'containers/layout-router'

const IndexPage = () =>
  <AppLayout
    title='Blog'
    description='Simple blog'
  >
    
    <Post />
  </AppLayout>

export default IndexPage
