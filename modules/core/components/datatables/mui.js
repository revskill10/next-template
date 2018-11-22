import MUIDataTable from 'mui-datatables';
import style from 'components/datatables/mui.style'

const defaultOptions = {
  filter: true,
  selectableRows: false,
  filterType: 'dropdown',
  responsive: 'scroll',
  fixedHeader: false,
};

const DataTable = ({data, title, columns, options}) => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  }
  return (
    <>
      <MUIDataTable 
        title={title} 
        data={data} 
        columns={columns} 
        options={finalOptions}
        className='container'
      />
      <style jsx global>{style}</style>
    </>
  )
}

export default DataTable
