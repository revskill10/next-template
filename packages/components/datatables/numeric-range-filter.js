import React, { Component } from 'react'

export class NumericRangeFilter extends Component {
  constructor(props) {
    super(props)

    this.fromInput = React.createRef();
    this.toInput = React.createRef();

    this.state = {
      fromFilter: '',
      toFilter: '',
    };

    this.valueGetter = this.props.valueGetter;

    this.onSubmit = this.onSubmit.bind(this);
  }

  doesFilterPass(params) {
    //const filter = this.state.filter.split('-');
    const gt = Number(this.state.fromFilter);
    const lt = Number(this.state.toFilter);
    const value = this.valueGetter(params.node);

    return value >= gt && value <= lt;
  }

  getModel() {
    return {
      fromFilter: this.state.fromFilter,
      toFilter: this.state.toFilter,
    };
  }

  setModel(model) {
    const fromFilter = model ? model.fromFilter : '';
    const toFilter = model ? model.toFilter : '';
    this.setState({
      fromFilter: fromFilter,
      toFilter: toFilter,
    });
  }

  afterGuiAttached(params) {
    this.fromInput.current.focus();
  }

  isFilterActive() {
    return (this.state.fromFilter !== '' || this.state.toFilter !== '');
  }

  onSubmit(event) {
    event.preventDefault();

    let fromFilter = event.target.elements.fromFilter.value;
    let toFilter = event.target.elements.toFilter.value;

    if (this.state.fromFilter !== fromFilter) {
      this.setState({fromFilter: fromFilter}, () => {
        this.props.filterChangedCallback();
      });
    }
    if (this.state.toFilter !== toFilter) {
      this.setState({toFilter: toFilter}, () => {
        this.props.filterChangedCallback();
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input 
          name="fromFilter" 
          ref={this.fromInput} 
          defaultValue={this.state.fromFilter}
          placeholder={'from'}
        />
        - 
        <input 
          name="toFilter" 
          ref={this.toInput} 
          defaultValue={this.state.toFilter}
          placeholder={'to'}
        />
        <button>Apply</button>
      </form>
    );
  }
}
