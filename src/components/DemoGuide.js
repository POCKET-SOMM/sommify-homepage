import React from 'react';
import {Offcanvas} from 'react-bootstrap'

class DemoGuide extends React.Component {
    render() {
        return (
            <div style={{ fontSize: '15px' }}>
                <Offcanvas.Header style={{paddingTop:'0px', paddingLeft:'0px'}}>
                    <Offcanvas.Title><h3>Demo Guide</h3></Offcanvas.Title>
                </Offcanvas.Header>
                <span>By pasting a recipe link:</span><br /><br />
                <ol>
                    <li>go to BBC Food (only works with BBC Food for now)</li>
                    <li>search for a recipe on the site</li>
                    <li>paste the recipe link into our demo and click “Wine Me”</li>
                    <li>look at the different properties of the wines suggested by clicking them open</li>
                    <li>enjoy a marvellous culinary experience</li>
                </ol>
                <br />
                <span>By typing in:</span><br /><br />
                <ol>
                    <li>type in what you are eating (for example: ”steak, fries”) and click “Wine Me” </li>
                    <li>also enjoy a wonderful culinary experience</li>
                </ol>
            </div>
        )
    }
}

export default DemoGuide;