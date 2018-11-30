import { Table } from 'antd';
const columns = [
{
  title: 'Week',
  dataIndex: 'week',
},
{
  title: 'Start date',
  dataIndex: 'start_date',
},
{
  title: 'End date',
  dataIndex: 'end_date',
},
{
  title: 'Semester',
  dataIndex: 'semester',
  render: (semester) => <div>{semester.name}</div>
},
];

const Weeks = ({weeks}) => {
  return (
    <Table columns={columns} dataSource={weeks} />
  )
}

export default Weeks
