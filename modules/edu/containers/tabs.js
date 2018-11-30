import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

function callback(key) {
}

export default ({items, defaultActiveKey = "1", tabPosition="top"}) => {
  const components = items.map((item, index) => {
    return (
      <TabPane tab={item.header} key={index}>{item.component}</TabPane>
    )
  })
  return(
    <Tabs defaultActiveKey={defaultActiveKey} onChange={callback} tabPosition={tabPosition}>
      {components}
    </Tabs>
  )
}
