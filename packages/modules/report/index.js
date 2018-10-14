import React, { Fragment } from 'react'
import MUIDataTable from 'mui-datatables';
import convertDataToArray from 'lib/convert-data-to-array'
import LiveComponent from 'containers/cache-component'
import {SubscribeAllLessonClass as subscription} from 'modules/report/index.gql'

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

const Module = ({data}) => (
  <Fragment>
    <h1>Danh sách buổi học theo tuần: </h1>
    <LiveComponent
      cache={data}
      subscription={subscription}
    >
      {DataTable}
    </LiveComponent>
  </Fragment>
)

export default Module