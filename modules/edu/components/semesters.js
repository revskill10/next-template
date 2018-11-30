import { Table } from 'antd';
const columns = [{
  title: 'Name',
  dataIndex: 'name',
},
{
  title: 'Start date',
  dataIndex: 'start_date',
},
{
  title: 'To date',
  dataIndex: 'to_date',
},
{
  title: 'School year',
  dataIndex: 'school_year',
  render: (school_year) => <div>{school_year.name}</div>
},
];

const Semesters = ({semesters}) => {
  return (
    <Table columns={columns} dataSource={semesters} />
  )
}

export default Semesters
