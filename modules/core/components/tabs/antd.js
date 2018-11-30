import { Tabs, Button } from 'antd';
import dynamic from 'next/dynamic'
//import {CalendarAlt} from 'styled-icons/fa-regular/CalendarAlt.cjs'
//import {Meetup} from 'styled-icons/fa-brands/Meetup.cjs'
const CalendarIcon = dynamic({
  loader: async () => {
    // Import the wasm module
    const {CalendarAlt} = await import('styled-icons/fa-regular/CalendarAlt.cjs')
    // Return a React component that calls the add_one method on the wasm module
    return (props) => <CalendarAlt size={20} />
  },
  ssr: false,
  loading: () => <span>...</span>
})

const MeetupIcon = dynamic({
  loader: async () => {
    // Import the wasm module
    const {Meetup} = await import('styled-icons/fa-brands/Meetup.cjs')
    // Return a React component that calls the add_one method on the wasm module
    return (props) => <Meetup size={20} />
  },
  ssr: false,
  loading: () => <span>...</span>
})
const iconsMap = {
  'calendar': <CalendarIcon />,
  'attendance': <MeetupIcon />
}
const TabPane = Tabs.TabPane;

const styles = {
  paddingLeft: '5px'
}
const DefaultTab = ({
  items,
  extra,
  position = 'top',
}) => {
  const tabItems = items.map((item, index) => {
    const header = (
      <div>
        {iconsMap[item.icon]}<span style={styles}>{item.header}</span>
      </div>
    )

    return (
      <TabPane tab={header} key={`tab-${index}`}>
        {item.component}
      </TabPane>
    )
  })
  return (
    <Tabs tabBarExtraContent={extra} tabPosition={position}>
      {tabItems}
    </Tabs>
  )
}  

export default DefaultTab