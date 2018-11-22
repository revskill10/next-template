import Layout from 'containers/layout-router'
import dynamic from 'next/dynamic'
import {AdminPageQuery as query} from 'modules/user/fragments/admin.gql'
import {MembershipsContext} from 'containers/contexts'
import ContextComponent from 'containers/context-component'
import Loader from 'components/loader'
const Tabs = dynamic(import('modules/user/components/tabs/admin'), {ssr: false, loading: () => <Loader />})
const UserForm = dynamic(import('modules/user/components/forms/memberships'), {ssr: false, loading: () => <Loader />})
const PermissionsForm = dynamic(import('modules/user/components/forms/permissions'), {ssr: false, loading: () => <Loader />})
const RolesForm = dynamic(import('modules/user/components/forms/roles_form'), {ssr: false, loading: () => <Loader />})
const Admin = ({t}) => {
  return (
    <Layout
      title={t('admin.title')}
      description='Simple things'
    >
      <ContextComponent
        query={query}
        context={MembershipsContext}
      >
        <Tabs 
          memberships={<UserForm /> } 
          permissions={<PermissionsForm />}
          roles={<RolesForm />}
        /> 
      </ContextComponent>
    </Layout>
  )
}

export const getInitialProps = async ({apolloClient}) => {
  await apolloClient.query({query})
}

export default Admin
