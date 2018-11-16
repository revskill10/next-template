import MUIDataTable from 'mui-datatables';

const options = {
  filter: true,
  selectableRows: false,
  filterType: 'dropdown',
  responsive: 'stacked',
  rowsPerPage: 10,
};

const DataTable = ({data, title, columns}) => {
  return (
    <MUIDataTable 
    title={title} 
    data={data} 
    columns={columns} 
    options={options} 
  />
  )
}

export default DataTable
