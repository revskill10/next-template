import { useForm } from 'lib/hooks/form'

import Input from 'components/forms/input'
import {Form, Button} from 'components/forms/styled'
import SlateEditor from 'components/editors/slate'

const TestForm = () => {

  const initialState = {
    firstName: "Truong",
    lastName: "Dung",
    age: 30,
  }
  
  const schema = {
    firstName: { type: "string", optional: false, min: 3 },
    lastName: { type: "string", optional: true },
    age: { type: "number", optional: true },
  }

  const {
    values,
    errors,
    onChange,
    onSubmit,
  } = useForm(initialState, schema)

  return (
    <div>
      <h1>New User</h1>
      <div>{JSON.stringify(values)}</div>
      <div>{JSON.stringify(errors)}</div>
      <Form onSubmit={onSubmit} >
        <label>First name</label>
        <Input
          name="firstName"
          placeholder="firstName"
          type="text"
          value={values.firstName}
          onChange={onChange}
        />
        <label>Last name</label>
        <Input
          name="lastName"
          placeholder="lastName"
          type="text"
          value={values.lastName}
          onChange={onChange}
        />
        <label>Age</label>
        <Input
          name="age"
          placeholder="age"
          type="text"
          convert={(val) => {
            const tmp = Number(val)
            if (isNaN(tmp)) {
              return val
            } else {
              return tmp
            }
          }}
          value={values.age}
          onChange={onChange}
        />
        <label>Bio:</label>
        <SlateEditor initialText={'Hello world'} />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default TestForm