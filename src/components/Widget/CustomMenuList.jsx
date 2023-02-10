import React from 'react';
import { FixedSizeList as List } from 'react-window';

const DefaultItemHeight = 40;

export default function CustomMenuList({ children, maxHeight, ...props }) {
  const Row = ({ index, style }) => (
    <div key={'row_' + index} style={style}>
      {children[index]}
    </div>
  );

  const childrenOptions = React.Children.toArray(children);
  const wrapperHeight =
    maxHeight < childrenOptions.length * DefaultItemHeight
      ? maxHeight
      : childrenOptions.length * DefaultItemHeight;

  return (
    <span className='react-virtualized-list-wrapper'>
      <List
        width='100%'
        height={wrapperHeight + 6}
        itemCount={childrenOptions.length}
        itemSize={DefaultItemHeight}
      >
        {Row}
      </List>
    </span>
  );
}
