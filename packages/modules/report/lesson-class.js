import MUIDataTable from 'mui-datatables';
import convertDataToArray from 'lib/utils/convert-data-to-array'

const columns = ["Tuan", "Don vi", "Giang vien",
  "Ma lop", "Ma mon hoc",
  "Phong", "Si so", "So Tiet"];

const options = {
  filter: true,
  selectableRows: true,
  filterType: 'dropdown',
  responsive: 'stacked',
  rowsPerPage: 10,
};

const DataTable = ({v_all_lesson_class}) => {
  return (
    <MUIDataTable 
    title={"Employee List"} 
    data={convertDataToArray(v_all_lesson_class, 
      ["tuan", "don_vi", "giang_vien", "ma_lop",
    "ma_mon_hoc", "phong", "si_so", "so_tiet"])} 
    columns={columns} 
    options={options} 
  />
  )
}

export default DataTable