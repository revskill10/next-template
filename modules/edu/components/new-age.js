import {Fragment} from 'react'
import { Button, Modal, Form, Input, Radio, Slider } from 'antd';
import {usePageContext} from 'modules/edu/contexts'

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form layout="vertical">
            <FormItem label="Age name">
              {getFieldDecorator('age_name', {
                rules: [{ required: true, message: 'Please input the age name!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Duration">
              {getFieldDecorator('duration', {
                initialValue: [16, 72]
              })(
              <Slider 
                range step={10}
                marks={{ 16: '16', 24: '24', 36: '36', 48: '48', 48: '48', 60: '60', 72: '72' }}
                />
              )}
            </FormItem>
            <FormItem className="collection-create-form_last-form-item">
              {getFieldDecorator('is_active', {
                initialValue: 'false',
              })(
                <Radio.Group>
                  <Radio value="true">Active</Radio>
                  <Radio value="false">Inactive</Radio>
                </Radio.Group>
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
      
      const variables = {
        age_name: values.age_name,
        duration: {
          from_month: values.duration[0],
          to_month: values.duration[1],
        },
        is_active: values.is_active === 'true',
      }
      const {insertAgeClientMutation} = this.props
      await insertAgeClientMutation({
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
        New Age
      </Button>}
        { visible && <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
        />}
        {visible && <Button type="primary" onClick={this.handleCreate}>
          Create Age
        </Button>}
      </div>
    );
  }
}

const Wrapper = () => {
  const {insertAgeClientMutation} = usePageContext()
  return (
    <FormHandler insertAgeClientMutation={insertAgeClientMutation} />
  )
}

export default Wrapper