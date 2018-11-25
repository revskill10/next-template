import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}
];

const Ages = ({ages}) => {
  return (
    <Table columns={columns} dataSource={ages} />
  )
}

export default Ages
