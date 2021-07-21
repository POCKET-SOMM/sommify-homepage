import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loadable = ({ loading, component, className, style = {
    marginTop: '100px',
    width: '50px',
    height: '50px'
} }) => (
    <div className="Loadable">
        <div style={{ display: loading ? 'none' : '' }}>
            {component}
        </div>
        <div className={className} style={{ display: loading ? 'flex' : 'none', justifyContent: 'center' }}>
            <Spinner
                // style={{
                //     ...style,
                //     display: loading ? '' : 'none'
                // }}
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
            />
        </div>
    </div>
);

Loadable.defaultProps = {
    style: {
        marginTop: '0px',
        width: '10px',
        height: '10px'
    }
}

export default Loadable;