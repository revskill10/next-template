import { Timeline, TimelineEvent } from "react-event-timeline";
import Item from 'modules/timeline/components/item'
export default () => {
  return (
    <Timeline>
      <TimelineEvent
        title="John Doe sent a SMS"
        createdAt="2016-09-12 10:06 PM"
        icon={<i />}
        iconColor="#6fba1c"
        collapsible
        showContent
      >
      I received the payment for $543. Should be shipping the item within a couple of hours. Thanks for the order!
      </TimelineEvent>
      <TimelineEvent
        title="You sent an email to John Doe"
        createdAt="2016-09-11 09:06 AM"
        icon={<i />}
        iconColor="#03a9f4"
        collapsible
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Item />
      </TimelineEvent>
      </Timeline>
  );
};
