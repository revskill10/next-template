import { Collapse } from 'antd';

const Panel = Collapse.Panel;

const Main = ({
  items
}) => {
  const panels = items.map((item, index) => {
    return (
      <Panel header={item.header} key={index}>
        {item.component}
      </Panel>
    )
  })
  return (
    <Collapse bordered={false} defaultActiveKey={['1']}>
      {panels}
    </Collapse>
  )
}

export default Main
