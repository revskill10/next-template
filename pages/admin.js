import { withI18next } from 'lib/hocs/with-i18next'
import AppLayout from 'containers/layouts/app'
import dynamic from 'next/dynamic'
import {AdminPageQuery as query} from 'pages/admin.gql'
import {MembershipsContext} from 'containers/contexts'
import ContextComponent from 'containers/context-component'
import NoSSR from 'react-no-ssr'

const Admin = ({t}) => {
  const UserForm = dynamic(import('components/forms/memberships'))
  return (
    <AppLayout
      title={t('admin.title')}
      description='Simple things'
    >
      <ContextComponent
        query={query}
        context={MembershipsContext}
      ><NoSSR>
        <UserForm />  
      </NoSSR>
      </ContextComponent>
    </AppLayout>
  )
}

Admin.getInitialProps = async ({apolloClient}) => {
  await apolloClient.query({query})
}

export default withI18next(['admin'])(Admin)
