import React from 'react';
import { components } from 'react-select';

const CustomMultiValue = ({ children, ...props }) => {
    // eslint-disable-next-line no-unused-vars
    // const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    // const newProps = { ...props, innerProps: rest };

    return (
        <components.MultiValue {...props}>
            {children}
        </components.MultiValue>
    );
};

export default CustomMultiValue;