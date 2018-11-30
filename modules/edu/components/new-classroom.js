import {Fragment} from 'react'
import { Button, Modal, Form, Input, Radio, Slider } from 'antd';
import {usePageContext} from 'modules/edu/contexts'
import { Divider } from 'antd';

const FormItem = Form.Item;
let marks = {}
for(let i = 2018; i < 2030; i++) {
  marks[i] = i
}
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { form } = this.props;
      const { getFieldDecorator } = form;
      
      return (
        <Form layout="vertical">
            <FormItem label="Classroom name">
              {getFieldDecorator('classroom_name', {
                rules: [{ required: true, message: 'Please input classroom name!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Amount">
              {getFieldDecorator('amount', {
                rules: [{ required: true, message: 'Please input the amount!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Building">
              {getFieldDecorator('building', {
                rules: [{ required: true, message: 'Please input the building!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Floor">
              {getFieldDecorator('floor', {
                rules: [{ required: true, message: 'Please input the floor!' }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
      );
    }
  }
);

class FormHandler extends React.Component {
  state = {
    visible: true,
  };

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

      const validated = {
        classroom_name: values.classroom_name,
        amount: Number(values.amount),
        building: values.building,
        floor: Number(values.floor),
      }
      
      const variables = {
        ...validated
      }
      const {insertClassRoomClientMutation} = this.props
      await insertClassRoomClientMutation({
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

    return (
      <div>
        { visible ? <Button type="default" onClick={this.handleCancel}>
          Cancel
        </Button> : <Button type="primary" onClick={this.showForm}>
        New Classroom
      </Button>}
        { visible && <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
        />}
        {visible && <Button type="primary" onClick={this.handleCreate}>
          Create Classroom
        </Button>}
      </div>
    );
  }
}

const Wrapper = () => {
  const {insertClassRoomClientMutation} = usePageContext()
  return (
    <FormHandler insertClassRoomClientMutation={insertClassRoomClientMutation} />
  )
}

export default Wrapper