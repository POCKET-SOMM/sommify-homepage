import React from 'react';
import { components } from 'react-select';

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  console.log(children.map((child) => child?.type));
  return (
    <ValueContainer {...props}>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
      <Placeholder {...props} className='d-inline' isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
    </ValueContainer>
  );
};

export default CustomValueContainer;
