import { Collapse } from 'antd';

const Panel = Collapse.Panel;

const Main = ({
  items,
  defaultActiveKey=['0', '1']
}) => {
  const panels = items.map((item, index) => {
    return (
      <Panel header={item.header} key={index}>
        {item.component}
      </Panel>
    )
  })
  return (
    <Collapse bordered={false} defaultActiveKey={defaultActiveKey}>
      {panels}
    </Collapse>
  )
}

export default Main
