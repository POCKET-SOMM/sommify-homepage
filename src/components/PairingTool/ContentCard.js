import React from 'react';
import { Card } from 'react-bootstrap';

const ContentCard = (props) => (
    <div style={{ padding: '5px', ...props.style }}>
        <Card style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f8f8',
            padding: '20px',
            textAlign: 'start'
        }}>
            {props.children}
        </Card>
    </div>
)

export default ContentCard;