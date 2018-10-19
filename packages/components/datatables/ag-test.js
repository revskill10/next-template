import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { NumberFormatter } from 'components/datatables/number-formatter';
import { NumericCellEditor} from 'components/datatables/number-cell-editor';
import { NumericRangeFilter } from 'components/datatables/numeric-range-filter';
import { dateComparator} from 'components/datatables/date-comparator'


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
          },
          {
            headerName: 'Date',
            field: 'date',
            comparator: dateComparator,
          }
        ],
        rowData: [
          {make: 'Toyota', model: 'Celica', price: 35000, date: '01/01/2018'},
          {make: 'Ford', model: 'Mondeo', price: 32000 , date: '01/04/2018'},
          {make: 'Porsche', model: 'Boxter', price: 72000, date: '01/12/2018'},
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
          <AgGridReact
            enableFilter={true}
            pagination={true}
            enableSorting={true}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData} 
            onCellValueChanged={(params) => console.log(params)}  
            frameworkComponents={this.state.frameworkComponents}
          />                
        );
    }
}

export default App;