import React, { useState } from 'react';



function MealIcon(props){


    return (
        <div className="hoverable clickable" style={{
            padding: 10,
            margin: 20,
            display: "inline-block",
            // position:'absolute',
            backgroundColor: props.selected ? '#ffb0bf' : '#ebebeb',
            borderRadius: "50%",
            width: props.size,
            height: props.size,
            left: 0,
            top: 0
        }}>
            <img
                style={{filter: props.selected ? '' : 'grayscale(1)'}}
                src={`icons/${props.image}.png`}
                width={props.imgsize}
                height={props.imgsize}
            />
        </div>
    );
}

export default MealIcon;