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

const SchoolYears = ({school_years}) => {
  return (
    <Table columns={columns} dataSource={school_years} />
  )
}

export default SchoolYears
