import React, { Component } from 'react'

export class NumericCellEditor extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
      return (
        <input 
          ref={this.textInput} 
          onKeyPress={this.onKeyPress}
          defaultValue={this.props.value}
        />
      );
  }
  onKeyPress(event) {
    if (!isNumeric(event.nativeEvent)) {
      event.preventDefault();
    }

    function isNumeric(event) {
      return /\d/.test(event.key);
    }
  }
  onKeyDown(event) {
    if (event.keyCode === 39 || event.keyCode === 37) {
      event.stopPropagation();
    }
  }

  componentDidMount() {
    this.textInput.current.addEventListener('keydown', this.onKeyDown);
  }

  afterGuiAttached() {
    if (this.textInput) this.textInput.current.focus();
  }
  getValue() {
    return this.textInput.current.value;
  };
}
