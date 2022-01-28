import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Linkedin, Globe2, Envelope } from 'react-bootstrap-icons';
import { MAIN_COLOR_DEP } from '../App';

const teamMembers = [
    { image: 'team_jp.jpeg', name: 'Jacob Pichna', title: 'Co-Founder & Business', linked: 'https://www.linkedin.com/in/pichna/' },
    { image: 'team_jd.jpeg', name: 'Julie Dupouy', title: 'Wine Expert', linked: 'https://www.linkedin.com/in/julie-dupouy-50305925/', website: 'https://www.juliedupouy.com/' },
    { image: 'team_tb.jpeg', name: 'Tomas Bedej', title: 'Co-Founder & Developer', linked: 'https://www.linkedin.com/in/bedej/' },
    { image: 'team_wb.jpeg', name: 'William Brach', title: 'Co-Founder & Developer', linked: 'https://www.linkedin.com/in/william-brach-4a20b6213/' },
]

class AboutUs extends React.Component {

    render() {
        return (
            <div>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h3>About Us</h3></Offcanvas.Title>
                </Offcanvas.Header>
                {/* <div style={{ height: '60px' }}>
                    <h3>About Us</h3>
                </div> */}
                <span>
                    We are creating an <span style={{ fontStyle: 'italic' }}>artificial intelligence sommelier</span> that will make quality pairings accessible to
                    anyone anywhere. Just paste a recipe link or type in what you are about to eat and our AI somm
                    will pair the meal with a selection of wines for a wonderful culinary experience.
                </span>
                <br /><br />
                {/* <span>
                    Currently, if you want to pair wine with food and you have five options:
                    <ul style={{ listStyle: 'none' }}>
                        <icon style={{ position: 'absolute' }}>📝</icon><li style={{ paddingLeft: '26px' }}>Ask a waiter</li>
                        <icon style={{ position: 'absolute' }}>🍷</icon><li style={{ paddingLeft: '26px' }}>Ask a sommelier</li>
                        <icon style={{ position: 'absolute' }}>🏪</icon><li style={{ paddingLeft: '26px' }}>Ask in the store</li>
                        <icon style={{ position: 'absolute' }}>🍾</icon><li style={{ paddingLeft: '26px' }}>Read off the bottle</li>
                        <icon style={{ position: 'absolute' }}>👩‍🎓</icon><li style={{ paddingLeft: '26px' }}>Study yourself</li>
                    </ul>
                </span>
                <span>
                    None of these match the modern need for instant and accurate information; we are here to change
                    that.
                </span><br /> */}
                <span>
                    Download our <a style={{ color: 'white' }} className="link clickable" onClick={e => { window.open('https://drive.google.com/file/d/1G1I1LyJBbGbM-ZcHsYxKfxbW77CiCziW/') }}>deck</a>.
                </span>

                <br /><br /><br />

                <div style={{ width: '100%' }}>
                    <h4>Team</h4>
                    {
                        teamMembers.map(member =>
                            <div style={{ height: '100px', marginBottom: '20px', width: '340px', display: 'inline-block' }}>
                                <img src={member.image} width={100} style={{ float: 'left' }} />
                                <span style={{ float: 'left', marginLeft: '20px' }}>
                                    <b>{member.name}</b><br />
                                    {member.title} <br />
                                    <Linkedin onClick={e => { window.open(member.linked) }} className="clickable" />
                                    {member.website ?
                                        <Globe2 onClick={e => { window.open(member.website) }} className='clickable' style={{ marginLeft: '5px' }} />
                                        : null
                                    }
                                </span>
                            </div>
                        )
                    }
                </div>

                <br />
                <span style={{ fontStyle: 'italic' }}>let’s talk</span><br />
                <div style={{ color: 'white !important' }}>
                    <Envelope />
                    <span className="m-2">
                        partner@pocketsomm.dev
                    </span><br />
                    <Linkedin />
                    <span style={{ textDecoration: 'underline' }} className="clickable m-2" onClick={e => { window.open('https://www.linkedin.com/company/pocketsomm') }}>Linkedin
                    </span><br />
                    <img src="/icons/crunchbase_icon.svg" width={16}></img>
                    <span style={{ textDecoration: 'underline' }} className="clickable m-2" onClick={e => { window.open('https://www.crunchbase.com/organization/pocketsomm') }}>Crunchbase
                    </span><br />
                </div>
            </div>
        )
    }
}


export default AboutUs;