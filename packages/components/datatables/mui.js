import MUIDataTable from 'mui-datatables';

const defaultOptions = {
  filter: true,
  selectableRows: false,
  filterType: 'dropdown',
  responsive: 'stacked',
  rowsPerPage: 10,
};

const DataTable = ({data, title, columns, options}) => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  }
  return (
    <MUIDataTable 
    title={title} 
    data={data} 
    columns={columns} 
    options={finalOptions} 
  />
  )
}

export default DataTable
