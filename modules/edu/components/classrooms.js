import {createContext} from 'react'
import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
},
{
  title: 'Amount',
  dataIndex: 'amount',
},
{
  title: 'Building',
  dataIndex: 'building',
},
{
  title: 'Floor',
  dataIndex: 'floor',
},
];
const EditableContext = createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const ClassRooms = ({classrooms}) => {
  return (
    <Table columns={columns} dataSource={classrooms} />
  )
}

export default ClassRooms
