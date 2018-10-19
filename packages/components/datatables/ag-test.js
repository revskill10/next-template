import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { NumberFormatter } from 'components/datatables/number-formatter';
import { NumericCellEditor} from 'components/datatables/number-cell-editor';
import { NumericRangeFilter } from 'components/datatables/numeric-range-filter';

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        columnDefs: [
            {headerName: 'Make', field: 'make'},
            {headerName: 'Model', field: 'model'},
            {
              headerName: 'Price', 
              field: 'price', 
              editable: true, 
              cellRenderer: 'numberFormatter',
              cellEditor: 'numericCellEditor',
              filter: 'numericRangeFilter'
            }
        ],
        rowData: [
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000}
        ],
        frameworkComponents: {
          'numberFormatter': NumberFormatter,
          'numericCellEditor': NumericCellEditor,
          'numericRangeFilter': NumericRangeFilter,
        }
      }
    }

    render() {
        return (
            <div
              className="ag-theme-balham"
              style={{ height: '200px', width: '600px' }}
            >
              <AgGridReact
                enableFilter={true}
                pagination={true}
                enableSorting={true}
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData} 
                onCellValueChanged={(params) => console.log(params)}  
                frameworkComponents={this.state.frameworkComponents}
              />                
            </div>
        );
    }
}

export default App;