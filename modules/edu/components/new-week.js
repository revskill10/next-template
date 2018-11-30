import {Fragment, Component} from 'react'
import { Button, Form, Input, Select } from 'antd';
import {usePageContext} from 'modules/edu/contexts'
import { DatePicker,  } from 'antd';
const { WeekPicker } = DatePicker
const FormItem = Form.Item;
const Option = Select.Option;

class SemesterSelector extends Component {
  render() {
    const {semesters, handleSemesterChange, default_semester} = this.props
    const items = semesters.map(item => {
      return (
        <Option value={item.id} key={item.key}>{`${item.name} - ${item.start_date} - ${item.to_date}`}</Option>
      )
    })
    return (
      <Select defaultValue={default_semester}  onChange={handleSemesterChange}>
        {items}
      </Select>
    )
  }
}

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    handleSemesterChange = (value) => {
      this.props.form.setFieldsValue({
        semester_id: value,
      });
    }

    render() {
      const { form, semesters } = this.props;
      const { getFieldDecorator } = form;
      
      return (
        <Form layout="vertical">
            <FormItem label="Week">
              {getFieldDecorator('week', {
                rules: [{required: true, message: 'Please input week!' }],
              })(
                <WeekPicker placeholder="Select week" />
              )}
            </FormItem>
            
            <FormItem label="Start date">
              {getFieldDecorator('start_date', {
                rules: [{type: 'object', required: true, message: 'Please input start date!' }],
              })(
                <DatePicker />
              )}
            </FormItem>
            <FormItem label="End date">
              {getFieldDecorator('end_date', {
                rules: [{type: 'object', required: true, message: 'Please input to date!' }],
              })(
                <DatePicker />
              )}              
            </FormItem>
            <FormItem label="Semester">
              {getFieldDecorator('semester_id', {
                rules: [{ required: true, message: 'Please choose a semester!' }],
              })(
                <SemesterSelector 
                  handleSemesterChange={this.handleSemesterChange} 
                  semesters={semesters}
                  default_semester={semesters[0].id}
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

    const { semesters } = props

    const defaultState = semesters.length > 0

    this.state = {
      visible: defaultState,
    };
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

      console.log('Received values of form: ', values);
      
      const variables = {
        ...values,
        week: Number(values['week'].format('w')),
        start_date: values['start_date'].format('YYYY-MM-DD'),
        end_date: values['end_date'].format('YYYY-MM-DD'),
      }
      const {insertWeekClientMutation} = this.props
      await insertWeekClientMutation({
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
    const {semesters} = this.props

    return (
      <div>
        { visible ? <Button type="default" onClick={this.handleCancel}>
          Cancel
        </Button> : <Button type="primary" onClick={this.showForm}>
        New Week
      </Button>}
        { visible && <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          semesters={semesters}          
        />}
        {visible && <Button type="primary" onClick={this.handleCreate}>
          Create Week
        </Button>}
      </div>
    );
  }
}

const Wrapper = () => {
  const {
    insertWeekClientMutation,
    sche_semesters,
  } = usePageContext()
  return (
    <FormHandler 
    insertWeekClientMutation={insertWeekClientMutation} 
      semesters={sche_semesters}
    />
  )
}

export default Wrapper