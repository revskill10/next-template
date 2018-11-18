import AppLayout from 'containers/layout-router'
import dynamic from 'next/dynamic'
import Grid from 'pages/profile.grid'
import NoSSR from 'react-no-ssr'

const Profile = () => {
  const UserTest = dynamic(import(/* webpackChunkName: 'user-info-card' */ 'components/auth/user-info'), { ssr: false })
  const ExcelImporter = dynamic(import(/* webpackChunkName: 'excel-importer' */ 'pages/excel-importer'), { ssr: false})

  return (
    <AppLayout
      title={'Profile'}
      description='Simple things'
      meta={      
        <meta property="og:title" content="FB post title" className={''} />        
      }
    >
      <Grid 
        left={<div>Left</div>}
        middle={<UserTest />}
        right={<div>Right</div>}>
        <NoSSR>
          <ExcelImporter />
        </NoSSR>
      </Grid>
    </AppLayout>
  )
}

export default Profile
