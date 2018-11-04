import { withI18next } from 'lib/hocs/with-i18next'
import AppLayout from 'containers/layouts/app'

const Admin = ({t}) => {
  return (
    <AppLayout
    title={t('admin.title')}
    description='Simple things'
  >
    <>Hello
    </>
    </AppLayout>
  )
}

export default withI18next(['admin'])(Admin)
