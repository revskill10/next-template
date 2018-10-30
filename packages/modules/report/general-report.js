import MUIDataTable from 'mui-datatables';
import convertDataToArray from 'lib/convert-data-to-array'
import TableCell from "@material-ui/core/TableCell";
/*
tuan
  total_class
  total_lesson_class
  total_student_absent
  total_teacher_do_not_finish_in_week
  total_teacher_in_week
  total_times_student_absent
  total_times_teacher_add
  total_times_teacher_do_not_write
  total_times_teacher_retired    
*/
const columns = [
  "tuan",
  { 
    name: "TC", 
    options: {
      customHeadRender: ({index, ...column}) => {
        return (
          <TableCell key={index}>
            Hello {column.name}
          </TableCell>
          
        )
      }
    }
  },
  "TLC",
  "TSA",
  "TTDNF",
  "TT",
  "TTSA",
  "TTTA",
  "TTTDNW",
  "TTTR"
];

const options = {
  filter: true,
  selectableRows: false,
  filterType: 'dropdown',
  responsive: 'stacked',
  rowsPerPage: 10,
};

const DataTable = ({v_general_report_in_week}) => {
  return (
    <MUIDataTable 
    title={"General Report"} 
    data={convertDataToArray(v_general_report_in_week, 
      ["tuan",
      "total_class",
      "total_lesson_class",
      "total_student_absent",
      "total_teacher_do_not_finish_in_week",
      "total_teacher_in_week",
      "total_times_student_absent",
      "total_times_teacher_add",
      "total_times_teacher_do_not_write",
      "total_times_teacher_retired"])} 
    columns={columns} 
    options={options} 
  />
  )
}

export default DataTable