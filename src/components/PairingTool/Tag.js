import React from 'react';
import { BsXLg } from 'react-icons/bs';

export default function Tag(props) {
    const [declined, setDeclined] = React.useState(false)

    return (
        <div className='tag'>
            <span style={{
                textDecoration: declined ? 'line-through' : '',
                color: declined ? 'darkred' : ''
            }}>
                {props.content}
            </span>
            {
                props.declinable ? <BsXLg className="clickable" onClick={e => setDeclined(!declined)} /> : null
            }
        </div>
    )
}