import { Table } from 'antd';
const columns = [
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

const Semesters = ({terms}) => {
  return (
    <Table columns={columns} dataSource={terms} />
  )
}

export default Semesters
