import React from 'react';
import { components } from 'react-select';

const CustomPlaceholder = ({ children, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const newProps = { ...props };
  //   const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  //   const newProps = { ...props, innerProps: rest };

  return (
    <components.Placeholder {...newProps}>{children}</components.Placeholder>
  );
};

export default CustomPlaceholder;
