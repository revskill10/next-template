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
            <FormItem label="From year">
              {getFieldDecorator('from_year', {
                rules: [{ required: true, message: 'Please input the from year!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="To year">
              {getFieldDecorator('to_year', {
                rules: [{ required: true, message: 'Please input the to year!' }],
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
    visible: false,
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
        from_year: Number(values.from_year),
        to_year: Number(values.to_year),
      }
      const {insertYearMutationClient} = this.props
      await insertYearMutationClient({
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
        New Year
      </Button>}
        { visible && <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
        />}
        {visible && <Button type="primary" onClick={this.handleCreate}>
          Create Year
        </Button>}
      </div>
    );
  }
}


const Wrapper = () => {
  const {insertYearMutationClient} = usePageContext()
  return (
    <FormHandler insertYearMutationClient={insertYearMutationClient} />
  )
}

export default Wrapper