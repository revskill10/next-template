import {Fragment, Component} from 'react'
import { Button, Form, Input, Select } from 'antd';
import {usePageContext} from 'modules/edu/contexts'
import { DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class SchoolYearSelector extends Component {
  render() {
    const {school_years, handleSchoolYearChange, defaultYear} = this.props
    const items = school_years.map(item => {
      return (
        <Option value={item.id} key={item.key}>{item.name}</Option>
      )
    })
    return (
      <Select defaultValue={defaultYear} onChange={handleSchoolYearChange}>
        {items}
      </Select>
    )
  }
}

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    handleSchoolYearChange = (value) => {
      this.props.form.setFieldsValue({
        school_year_id: value,
      });
    }

    render() {
      const { form, school_years } = this.props;
      const { getFieldDecorator } = form;
      
      return (
        <Form layout="vertical">
            <FormItem label="Semester name">
              {getFieldDecorator('semester_name', {
                rules: [{ required: true, message: 'Please input semester name!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Start date">
              {getFieldDecorator('start_date', {
                rules: [{type: 'object', required: true, message: 'Please input start date!' }],
              })(
                <DatePicker />
              )}
            </FormItem>
            <FormItem label="To date">
              {getFieldDecorator('to_date', {
                rules: [{type: 'object', required: true, message: 'Please input to date!' }],
              })(
                <DatePicker />
              )}              
            </FormItem>
            <FormItem label="School year">
              {getFieldDecorator('school_year_id', {
                rules: [{ required: true, message: 'Please choose school year!' }],
              })(
                <SchoolYearSelector 
                  handleSchoolYearChange={this.handleSchoolYearChange} 
                  school_years={school_years}
                  defaultYear={school_years[0].id}
                />
              )}              
            </FormItem>
          </Form>
      );
    }
  }
);

class FormHandler extends React.Component {
  constructor(props) {
    super(props)

    const {school_years} = props

    const defaultState = school_years.length > 0

    this.state = {
      visible: defaultState
    }
  }

  showForm = () => {
    this.setState({ visible: !this.state.visible });
  }

  handleCancel = () => {
    this.setState({ visible: !this.state.visible });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      //console.log('Received values of form: ', values);
      
      const variables = {
        semester_name: values['semester_name'],
        school_year_id: values['school_year_id'],
        start_date: values['start_date'].format('YYYY-MM-DD'),
        to_date: values['to_date'].format('YYYY-MM-DD'),
      }
      const {insertSemesterClientMutation} = this.props
      await insertSemesterClientMutation({
        variables
      })
      form.resetFields();
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { visible } = this.state
    const {school_years} = this.props

    return (
      <div>
        { visible ? <Button type="default" onClick={this.handleCancel}>
          Cancel
        </Button> : <Button type="primary" onClick={this.showForm}>
        New Semester
      </Button>}
        { visible && <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          school_years={school_years}
        />}
        {visible && <Button type="primary" onClick={this.handleCreate}>
          Create Semester
        </Button>}
      </div>
    );
  }
}

const Wrapper = () => {
  const {
    insertSemesterClientMutation,
    sche_school_years,
  } = usePageContext()
  return (
    <FormHandler 
      insertSemesterClientMutation={insertSemesterClientMutation} 
      school_years={sche_school_years}
      defaultState={sche_school_years.length > 0}
    />
  )
}

export default Wrapper