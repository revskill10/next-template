import Layout from 'containers/layout-router'
import dynamic from 'next/dynamic'
import Loader from 'components/loader'
import {withNamespaces} from 'react-i18next'
const Grid = dynamic(import(/* webpackChunkName: 'profile-grid' */ 'modules/user/components/profile.grid'), { ssr: false, loading: () => <Loader /> })
const UserTest = dynamic(import(/* webpackChunkName: 'user-info-card' */ 'components/auth/user-info'), { ssr: false, loading: () => <Loader /> })
const ExcelImporter = dynamic(import(/* webpackChunkName: 'excel-importer' */ 'components/importers/excel-importer'), { ssr: false, loading: () => <Loader />})

const Profile = ({t}) => {
  return (
    <Layout
      title={'Profile'}
      description='Simple things'
      meta={      
        <meta property="og:title" content="FB post title" className={''} />        
      }
    >
      <Grid 
        left={<div>{t('lng')}</div>}
        middle={<UserTest />}
        right={<div>Right</div>}>
        <ExcelImporter />
      </Grid>
    </Layout>
  )
}
export default withNamespaces(['common'])(Profile)
