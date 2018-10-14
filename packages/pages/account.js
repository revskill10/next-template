import AppLayout from 'containers/layouts/app'
import RegisterForm from 'containers/forms/register-form'

const Account = ({t}) =>
  <AppLayout
    title={t ? t('title.home') : 'Account' }
    description={t ? t('description.home') : 'Account'}
  >        
    <RegisterForm />
  </AppLayout>

export default Account