import React from 'react'
import Select from 'react-select'

export default class MySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(this.props.fieldName, value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.fieldName, true);
  };

  render() {
    const { options, isMulti } = this.props
    return (
      <div style={{ margin: '1rem 0' }}>
        <Select
          id="color"
          options={options}
          isMulti={isMulti}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error &&
          this.props.touched && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
          )}
      </div>
    );
  }
}