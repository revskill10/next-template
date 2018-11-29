import { Table } from 'antd';
const columns = [{
  title: 'Name',
  dataIndex: 'name',
},
{
  title: 'From month',
  dataIndex: 'from_month',
},
{
  title: 'To month',
  dataIndex: 'to_month',
},
{
  title: 'Is active',
  dataIndex: 'is_active',
},
{
  title: 'Sort order',
  dataIndex: 'sort_order',
},
];

const Ages = ({ages}) => {
  return (
    <Table columns={columns} dataSource={ages} />
  )
}

export default Ages
