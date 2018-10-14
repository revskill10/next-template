import { Formik } from 'formik'
import * as Yup from 'yup'
import RegisterForm from 'components/forms/register-form'

const Form = () =>
  <Formik
    initialValues={{ email: '' }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Required'),
    })}
  >
    {props => <RegisterForm {...props} />}
  </Formik>

export default Form