import React, { Component } from 'react';
import { render } from 'react-dom';
import { arrayMove, SortableElement, SortableContainer } from 'react-sortable-hoc';
import Item from 'modules/attendance/components/item'

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '16px',
};

const gridItemStyles = {
  backgroundColor: '#e5e5e5',
};

const GridItem = SortableElement(({ value }) =>
  <div style={gridItemStyles}>
    <Item />
  </div>
);

const Grid = SortableContainer(({ items }) =>
  <div style={gridStyles}>
    {items.map((value, index) =>
      <GridItem
        key={`item-${index}`}
        index={index}
        value={value}
      />
    )}
  </div>
);

class App extends Component {
  state = {
    items: Array.apply(null, Array(100)).map((val, index) => `Item ${index}`),
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  render() {
    return <Grid items={this.state.items} onSortEnd={this.onSortEnd} axis="xy" />;
  }
}

export default App
