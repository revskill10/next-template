import React from "react";
import {Input} from 'components/forms/styled'

const MyInput = ({ type, name, onChange, value, convert, ...rest }) => (
  <Input
    name={name}
    type={type}
    value={value}
    onChange={event => {
      event.preventDefault();      
      const value = convert ? convert(event.target.value) : event.target.value
      onChange(name, value);
    }}
    {...rest}
  />
);

export default MyInput;
