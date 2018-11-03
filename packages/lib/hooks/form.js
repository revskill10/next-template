import { useState } from 'react'
import Validator from 'fastest-validator'
/* Custom validator
const Validator = require("fastest-validator");
const v = new Validator({
    messages: {
        stringMin: "A(z) '{field}' mező túl rövid. Minimum: {expected}, Jelenleg: {actual}",
        stringMax: "A(z) '{field}' mező túl hosszú. Minimum: {expected}, Jelenleg: {actual}"
    }
});

v.validate({ name: "John" }, { name: { type: "string", min: 6 }});
*/
export const useForm = (initialState, schema, validator) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState([])
  const v = validator ? validator : new Validator();
  const check = v.compile(schema);
  
  function updateValues(value, name) {
    setValues({ ...values, [name]: value}, () => {
      console.log(values)
    })
  }

  function onChange(value, name) {
    if (value.target) {      
      const e = value
      e.preventDefault();
      updateValues(e.target.name, e.target.value)
    } else {
      updateValues(name, value)
    }
    
  }

  function onSubmit(e) {
    e.preventDefault()
    const errors = check(values)
    if (errors.length > 0) {
      setErrors(errors)
    } else {
      setErrors([])
    }
  }

  const error = {}

  return {
    values,
    errors,
    onChange,
    onSubmit,
  }
} 

export default useForm