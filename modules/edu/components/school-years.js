import {createContext} from 'react'
import { Table } from 'antd';
const columns = [{
  title: 'Name',
  dataIndex: 'name',
},
{
  title: 'From year',
  dataIndex: 'from_year',
},
{
  title: 'To year',
  dataIndex: 'to_year',
},];
const EditableContext = createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const SchoolYears = ({school_years}) => {
  return (
    <Table columns={columns} dataSource={school_years} />
  )
}

export default SchoolYears
