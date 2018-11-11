import {useContext} from 'react'
import { withFormik } from 'formik'
import MySelect from 'components/forms/select'
import {MembershipsContext} from 'containers/contexts'
import Button from '@material-ui/core/Button';
import dynamic from 'next/dynamic'
import {AssignRoles as assignRolesMutation} from 'components/forms/memberships.gql'
import {AdminPageQuery} from 'pages/admin.gql'
import { graphql } from 'react-apollo'
import {compose} from 'recompose'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()
const {USER_ROLE_ID} = publicRuntimeConfig

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    user_id: '',
    role_ids: [],
  }),
  handleSubmit: (values, { props, setSubmitting }) =>  {
    const variables = {
      userId: values.user_id.value,
      roleIds: values.role_ids.map(t => t.value),
    };
    
    setTimeout(async () => {
      const res = await props.assignRolesMutation({variables})
      try {
        if (res.data) {
          await props.adminPageQuery.refetch()
        }
      } catch (e) {
      }
      
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm',
});

const MembershipsForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,    
  } = props;

  const options = useContext(MembershipsContext)


  const onChange = (e, value) => {
    const tmpRoles = options.roles.filter(function(item) {
      return value.roles.includes(item.label)
    })
    values.role_ids = tmpRoles
    setFieldValue(e, value)
  }

  let UserDetail = null

  if (values.user_id) {
    UserDetail = dynamic(import('components/forms/user-detail'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user_id" style={{ display: 'block' }}>
        Email
      </label>
      <MySelect
        value={values.user_id}
        onChange={onChange}
        onBlur={setFieldTouched}
        error={errors.user_id}
        touched={touched.user_id}
        options={options.users}
        fieldName={'user_id'}
      />
      
      { values.user_id ? (
        <>
        <label htmlFor="role_ids" style={{ display: 'block' }}>
          Roles
        </label>
        <MySelect
          value={values.role_ids.filter(function(item) {
            return (item.value !== "c05634da-723c-484e-9d4c-52702e963849") && (item.value !== "61d6e7f4-19a2-4924-ace3-84ec7888e784")
          })}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.role_ids}
          touched={touched.role_ids}
          options={options.roles.filter(function(item) {
            return item.label !== 'user'
          })}
          fieldName={'role_ids'}
          isMulti
        />
        </>)  : null }
     
      <Button variant="contained" color="secondary"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}>
        Reset
      </Button>

      <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
        Submit
      </Button>

      { values.user_id ? <UserDetail detail={values.user_id.detail} /> : null}
    </form>
  );
};

export default compose(  
  graphql(AdminPageQuery, {name: 'adminPageQuery'}),
  graphql(assignRolesMutation, {name: 'assignRolesMutation'}),
)(formikEnhancer(MembershipsForm));