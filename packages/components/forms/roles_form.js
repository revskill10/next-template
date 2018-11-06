import {useContext} from 'react'
import { withFormik } from 'formik'
import MySelect from 'components/forms/select'
import {MembershipsContext} from 'containers/contexts'
import Button from '@material-ui/core/Button';
//import dynamic from 'next/dynamic'
import {AssignPermissions as assignPermissionsMutation} from 'components/forms/roles_form.gql'
import {AdminPageQuery} from 'pages/admin.gql'
import { graphql } from 'react-apollo'
import {compose} from 'recompose'

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    role_id: '',
    permission_ids: [],
  }),
  handleSubmit: (values, { props, setSubmitting }) =>  {
    const variables = {
      roleId: values.role_id.value,
      permissionIds: values.permission_ids.map(t => t.value),
    };
    
    setTimeout(async () => {
      const res = await props.assignPermissionsMutation({variables})
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

const RolesForm = props => {
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
    const tmpPermissions = options.permissions.filter(function(item) {
      return value.permissions.includes(item.label)
    })
    values.permission_ids = tmpPermissions
    setFieldValue(e, value)
  }

  //let RoleDetail = null

  //if (values.role_id) {
//    RoleDetail = dynamic(import('components/forms/role-detail'))
  //}

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user_id" style={{ display: 'block' }}>
        Role
      </label>
      <MySelect
        value={values.role_id}
        onChange={onChange}
        onBlur={setFieldTouched}
        error={errors.role_id}
        touched={touched.role_id}
        options={options.roles}
        fieldName={'role_id'}
      />
      
      { values.role_id ? (
        <>
        <label htmlFor="permissions_ids" style={{ display: 'block' }}>
          Permissions
        </label>
        <MySelect
          value={values.permission_ids}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.permission_ids}
          touched={touched.permission_ids}
          options={options.permissions}
          fieldName={'permission_ids'}
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

      {/* values.user_id ? <UserDetail detail={values.user_id.detail} /> : null */}
    </form>
  );
};

export default compose(  
  graphql(AdminPageQuery, {name: 'adminPageQuery'}),
  graphql(assignPermissionsMutation, {name: 'assignPermissionsMutation'}),
)(formikEnhancer(RolesForm));