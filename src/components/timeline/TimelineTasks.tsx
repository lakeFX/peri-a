import React from 'react';
import { FixedSizeList } from 'react-window';
import { useTimelineStore } from '../../store/timelineStore';

const TimelineTasks = React.memo(() => {
  const { events } = useTimelineStore();

  const Row = ({ index, style }) => {
    const event = events[index];
    return (
      <div style={style}>
        {event.title}
      </div>
    );
  };

  return (
    <div>
      <h2>Timeline Tasks</h2>
      <FixedSizeList
        height={400}
        width="100%"
        itemCount={events.length}
        itemSize={50}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
});

export default TimelineTasks;