import React from 'react';
import { Card, Fade } from 'react-bootstrap';
import { CircleFlag } from 'react-circle-flags';
import * as Icon from 'react-bootstrap-icons';

const MAIN_COLOR = '#80183b'
const SECONDARY_COLOR = '#ededed'

const qualities = {
    'bodied': 'Bodied',
    'tannic': 'Tannic',
    'sweet': 'Sweet',
    // 'dry': 'Dry',
    'acid': 'Crisp'
}

const qualitiesB = {
    'bodied': 'Light',
    'tannic': 'Smooth',
    'sweet': 'Dry',
    'acid': 'Soft'
}

const country_code = {
    'Andorra': 'AD',
    'United Arab Emirates': 'AE',
    'Afghanistan': 'AF',
    'Antigua & Barbuda': 'AG',
    'Anguilla': 'AI',
    'Albania': 'AL',
    'Armenia': 'AM',
    'Angola': 'AO',
    'Argentina': 'AR',
    'American Samoa': 'AS',
    'Austria': 'AT',
    'Australia': 'AU',
    'Aruba': 'AW',
    'Åland Islands': 'AX',
    'Azerbaijan': 'AZ',
    'Bosnia & Herzegovina': 'BA',
    'Barbados': 'BB',
    'Bangladesh': 'BD',
    'Belgium': 'BE',
    'Burkina Faso': 'BF',
    'Bulgaria': 'BG',
    'Bahrain': 'BH',
    'Burundi': 'BI',
    'Benin': 'BJ',
    'St. Barthélemy': 'BL',
    'Bermuda': 'BM',
    'Brunei': 'BN',
    'Bolivia': 'BO',
    'Brazil': 'BR',
    'Bahamas': 'BS',
    'Bhutan': 'BT',
    'Bouvet Island': 'BV',
    'Botswana': 'BW',
    'Belarus': 'BY',
    'Belize': 'BZ',
    'Canada': 'CA',
    'Cocos (Keeling) Islands': 'CC',
    'Congo - Kinshasa': 'CD',
    'Central African Republic': 'CF',
    'Congo - Brazzaville': 'CG',
    'Switzerland': 'CH',
    'Côte d’Ivoire': 'CI',
    'Cook Islands': 'CK',
    'Chile': 'CL',
    'Cameroon': 'CM',
    'China': 'CN',
    'Colombia': 'CO',
    'Costa Rica': 'CR',
    'Cuba': 'CU',
    'Cape Verde': 'CV',
    'Curaçao': 'CW',
    'Christmas Island': 'CX',
    'Cyprus': 'CY',
    'Czech Republic': 'CZ',
    'Germany': 'DE',
    'Djibouti': 'DJ',
    'Denmark': 'DK',
    'Dominica': 'DM',
    'Dominican Republic': 'DO',
    'Algeria': 'DZ',
    'Ecuador': 'EC',
    'Estonia': 'EE',
    'Egypt': 'EG',
    'Eritrea': 'ER',
    'Spain': 'ES',
    'Ethiopia': 'ET',
    'European Union': 'EU',
    'Finland': 'FI',
    'Fiji': 'FJ',
    'Falkland Islands': 'FK',
    'Micronesia': 'FM',
    'Faroe Islands': 'FO',
    'France': 'FR',
    'Gabon': 'GA',
    'United Kingdom': 'GB',
    'England': 'GB-ENG',
    'Northern Ireland': 'IR',
    'Scotland': 'CT',
    'Wales': 'LS',
    'Shetland': 'ET',
    'Grenada': 'GD',
    'Georgia': 'GE',
    'French Guiana': 'GF',
    'Guernsey': 'GG',
    'Ghana': 'GH',
    'Gibraltar': 'GI',
    'Greenland': 'GL',
    'Gambia': 'GM',
    'Guinea': 'GN',
    'Guadeloupe': 'GP',
    'Equatorial Guinea': 'GQ',
    'Greece': 'GR',
    'So. Georgia & So. Sandwich Isl.': 'GS',
    'Guatemala': 'GT',
    'Guam': 'GU',
    'Guinea-Bissau': 'GW',
    'Guyana': 'GY',
    'Hong Kong (China)': 'HK',
    'Heard & McDonald Islands': 'HM',
    'Honduras': 'HN',
    'Croatia': 'HR',
    'Haiti': 'HT',
    'Hungary': 'HU',
    'Indonesia': 'ID',
    'Ireland': 'IE',
    'Israel': 'IL',
    'Isle of Man': 'IM',
    'India': 'IN',
    'British Indian Ocean Territory': 'IO',
    'Iraq': 'IQ',
    'Iran': 'IR',
    'Iceland': 'IS',
    'Italy': 'IT',
    'Jersey': 'JE',
    'Jamaica': 'JM',
    'Jordan': 'JO',
    'Japan': 'JP',
    'Kenya': 'KE',
    'Kyrgyzstan': 'KG',
    'Cambodia': 'KH',
    'Kiribati': 'KI',
    'Comoros': 'KM',
    'St. Kitts & Nevis': 'KN',
    'North Korea': 'KP',
    'South Korea': 'KR',
    'Kuwait': 'KW',
    'Cayman Islands': 'KY',
    'Kazakhstan': 'KZ',
    'Laos': 'LA',
    'Lebanon': 'LB',
    'St. Lucia': 'LC',
    'Pride': 'BT',
    'Liechtenstein': 'LI',
    'Sri Lanka': 'LK',
    'Liberia': 'LR',
    'Lesotho': 'LS',
    'Lithuania': 'LT',
    'Luxembourg': 'LU',
    'Latvia': 'LV',
    'Libya': 'LY',
    'Morocco': 'MA',
    'Monaco': 'MC',
    'Moldova': 'MD',
    'Montenegro': 'ME',
    'St. Martin': 'MF',
    'Madagascar': 'MG',
    'Marshall Islands': 'MH',
    'Macedonia': 'MK',
    'Mali': 'ML',
    'Myanmar (Burma)': 'MM',
    'Mongolia': 'MN',
    'Macau (China)': 'MO',
    'Northern Mariana Islands': 'MP',
    'Martinique': 'MQ',
    'Mauritania': 'MR',
    'Montserrat': 'MS',
    'Malta': 'MT',
    'Mauritius': 'MU',
    'Maldives': 'MV',
    'Malawi': 'MW',
    'Mexico': 'MX',
    'Malaysia': 'MY',
    'Mozambique': 'MZ',
    'Namibia': 'NA',
    'New Caledonia': 'NC',
    'Niger': 'NE',
    'Norfolk Island': 'NF',
    'Nigeria': 'NG',
    'Nicaragua': 'NI',
    'Netherlands': 'NL',
    'Norway': 'NO',
    'Nepal': 'NP',
    'Nauru': 'NR',
    'Niue': 'NU',
    'New Zealand': 'NZ',
    'Oman': 'OM',
    'Panama': 'PA',
    'Peru': 'PE',
    'French Polynesia': 'PF',
    'Papua New Guinea': 'PG',
    'Philippines': 'PH',
    'Pakistan': 'PK',
    'Poland': 'PL',
    'St. Pierre & Miquelon': 'PM',
    'Pitcairn Islands': 'PN',
    'Puerto Rico': 'PR',
    'Palestinian Territories': 'PS',
    'Portugal': 'PT',
    'Palau': 'PW',
    'Paraguay': 'PY',
    'Qatar': 'QA',
    'Réunion': 'RE',
    'Romania': 'RO',
    'Serbia': 'RS',
    'Russia': 'RU',
    'Rwanda': 'RW',
    'Saudi Arabia': 'SA',
    'Solomon Islands': 'SB',
    'Seychelles': 'SC',
    'Sudan': 'SD',
    'Sweden': 'SE',
    'Singapore': 'SG',
    'St. Helena': 'SH',
    'Slovenia': 'SI',
    'Svalbard & Jan Mayen': 'SJ',
    'Slovakia': 'SK',
    'Sierra Leone': 'SL',
    'San Marino': 'SM',
    'Senegal': 'SN',
    'Somalia': 'SO',
    'Suriname': 'SR',
    'South Sudan': 'SS',
    'São Tomé & Príncipe': 'ST',
    'El Salvador': 'SV',
    'Sint Maarten': 'SX',
    'Syria': 'SY',
    'Swaziland': 'SZ',
    'Turks & Caicos Islands': 'TC',
    'Chad': 'TD',
    'French Southern Territories': 'TF',
    'Togo': 'TG',
    'Thailand': 'TH',
    'Tajikistan': 'TJ',
    'Tokelau': 'TK',
    'Timor-Leste': 'TL',
    'Turkmenistan': 'TM',
    'Tunisia': 'TN',
    'Tonga': 'TO',
    'Turkey': 'TR',
    'Trinidad & Tobago': 'TT',
    'Tuvalu': 'TV',
    'Taiwan': 'TW',
    'Tanzania': 'TZ',
    'Ukraine': 'UA',
    'Uganda': 'UG',
    'U.S. Outlying Islands': 'UM',
    'United States': 'US',
    'California': 'CA',
    'Uruguay': 'UY',
    'Uzbekistan': 'UZ',
    'Vatican City': 'VA',
    'St. Vincent & Grenadines': 'VC',
    'Venezuela': 'VE',
    'British Virgin Islands': 'VG',
    'U.S. Virgin Islands': 'VI',
    'Vietnam': 'VN',
    'Vanuatu': 'VU',
    'Wallis & Futuna': 'WF',
    'Samoa': 'WS',
    'Kosovo': 'XK',
    'Yemen': 'YE',
    'Mayotte': 'YT',
    'South Africa': 'ZA',
    'Zambia': 'ZM',
    'Zimbabwe': 'ZW'
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}

const imageLink = (link) => {
    let productNumber = link.split('/')[5]
    let productName = link.split('/')[6]
    return `https://images.alko.fi/images/cs_srgb,f_auto,t_products/cdn/${productNumber}/${productName}.jpg`
}

const wineOrigin = (wine) => {
    let reg_list = stringToList(wine['region'])
    let index = reg_list.indexOf(wine['country'])
    if (index > -1) {
        reg_list.splice(index, 1)
    }
    return (
        <span style={{ fontSize: '12px' }}>
            <CircleFlag countryCode={country_code[wine['country']].toLowerCase()} height="15" style={{ marginRight: '5px' }} />
            {reg_list.join(', ')} {wine['year'] ? wine['year'] : ''}
        </span>
    )
}

const wineQualsCollapsed = (wine) => {
    return Object.keys(qualities).map(qual =>
        wine[qual] >= 3 ? `${qualities[qual]}` :
            wine[qual] === 0 ? `${qualitiesB[qual]}` :
                '').filter(e => e).join(' • ')
}

const stringToList = (str) => {
    return str.match(RegExp(/(?:'([^,]+)'|"([^,]+)")/g)).map(e => e.slice(1, -1))
}

class WinePlate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: false,
            toggled: false
        }
    }

    // const [hovered, setHovered] = useState(false)
    // const [toggled, setToggled] = useState(false)

    setHovered = (v) => {
        if(!this.props.disabled)
            this.setState({
                hovered: v
            })
    }

    setToggled = (v) => {
        if(!this.props.disabled)
            this.setState({
                toggled: v
            })
    }

    render() {
        return (
            <Card
                key={this.props.wine['PRODUCT NUMBER']}
                className={`${this.state.disabled ? 'clickable' : ''} wineplate animated`}
                onMouseEnter={e => { this.setHovered(true) }}
                onMouseLeave={e => { this.setHovered(false) }}
                border={this.state.hovered ? 'lightgray' : 'light'}
                style={{
                    backgroundColor: '#f7f7f7',
                    borderColor: this.state.hovered ? MAIN_COLOR : SECONDARY_COLOR,
                    width: '95%',
                    margin: '0px !important'
                    // boxShadow:`inset 37px 0px 1px -30px ${types[wine.type]}` 
                }}>
                <div style={{
                    borderRadius: '0px 3px 0px 5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: this.state.toggled ? MAIN_COLOR : SECONDARY_COLOR,
                    color: this.state.toggled ? 'white' : 'black',
                    width: '80px',
                    height: '30px',
                    position: 'absolute',
                    right: '0px',
                    top: '0px',
                    fontSize: '15px'
                }}>
                    <div>
                        <span style={{ display: 'block' }}>€{this.props.wine['price'].toFixed(2)}</span>
                        {/* <a style={{ display: 'block', fontSize: '10px' }}>see store</a> */}
                    </div>
                </div>
                <div onClick={e => { this.setToggled(!this.state.toggled) }} id="wine-basics" style={{
                    height: '90px',
                    padding: '10px',
                    marginBottom: '10px'
                }}>
                    {   !this.props.disabled ?
                        this.state.toggled ? <Icon.CaretUpFill color={MAIN_COLOR} style={{
                            position: 'absolute',
                            top: '55px',
                            right: '10px'
                        }} /> : <Icon.CaretDownFill color={MAIN_COLOR} style={{
                            position: 'absolute',
                            top: '55px',
                            right: '10px'
                        }} /> : null

                    }
                    <img
                        alt="wine-img"
                        className="nodrag"
                        style={{
                            marginRight: '10px',
                            float: 'left',
                            transform: this.state.hovered ? 'scale(1.1)' : '',
                            transition: 'transform 0.3s',
                            display: 'inline-block'
                        }}
                        src={imageLink(this.props.wine.link)}
                        height="70px"
                    />
                    <div style={{ float: 'left', position: 'relative', width: 'calc(100% - 146.66px)', display: 'inline-block', height: '100%' }}>
                        <span
                            style={{
                                display: 'block',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: '14px',
                                textAlign: 'start'
                            }}>
                            <b className="winelink"
                                onClick={e => { window.open(this.props.wine['link'], '_blank') }} >{truncate(this.props.wine.name.replaceAll('-', ' '), 100)}</b>
                        </span>
                        <div style={{ color: 'gray', left: '0px' }}>
                            <span style={{
                                display: 'block', textAlign: 'start', fontSize: '13px',
                                width: 'calc(100%)',
                                whiteSpace: this.state.toggled ? '' : 'nowrap',
                                overflow: this.state.toggled ? '' : 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {wineOrigin(this.props.wine)}
                                {/* <Flag country={country_code[wine['country']]} size={15} style={{ marginRight: '5px' }}></Flag>{wine['wine_region']}{wine['wine_subregion'] ? `, ${wine['wine_subregion']}` : ''}{wine['year'] !== '0' ? ` - ${wine['year']}` : ''} */}
                            </span>
                            <span style={{
                                display: 'block', textAlign: 'start', fontSize: '13px', width: 'calc(100%)',
                                whiteSpace: this.state.toggled ? '' : 'nowrap',
                                overflow: this.state.toggled ? '' : 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {capitalizeFirstLetter(this.props.wine['type'] === 'desert' ? 'Dessert' : this.props.wine['type'])}
                            </span>
                            <Fade in={!this.state.toggled}>
                                <span style={{
                                    display: 'block', textAlign: 'start', fontSize: '13px', width: 'calc(100%)',
                                    whiteSpace: this.state.toggled ? '' : 'nowrap',
                                    overflow: this.state.toggled ? '' : 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {
                                        wineQualsCollapsed(this.props.wine)
                                    }
                                </span>
                            </Fade>
                        </div>
                    </div>
                </div>

                <Fade in={this.state.toggled}>
                    <div style={{ display: this.state.toggled ? '' : 'none' }}>
                        <div id="wine-variety"
                            style={{
                                display: this.props.wine['variety'].length < 3 ? 'none' : 'flex',
                                width: '100%',
                                backgroundColor: '#ededed',
                                padding: '10px',
                                minHeight: '50px',
                                justifyContent: 'stretch',
                                alignItems: 'center'
                            }}>
                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    alt="grape_icon"
                                    style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: 'auto', marginBottom: 'auto' }}
                                    src="icons/grapes.png"
                                    width="22" />
                            </div>
                            <div style={{ height: '100%', width: '80%' }}>
                                {
                                    this.props.wine['variety'].length > 3 ? stringToList(this.props.wine['variety']).map(v =>
                                        <div key={`${this.props.wine['PRODUCT NUMBER']}_${v}_variety`} style={{
                                            backgroundColor: 'white',
                                            borderStyle: 'solid',
                                            borderWidth: '1px',
                                            borderColor: '#d4d4d4',
                                            borderRadius: '1px',
                                            padding: '2px',
                                            paddingLeft: '5px',
                                            paddingRight: '5px',
                                            margin: '3px',
                                            height: '25px',
                                            display: 'inline-block',
                                            fontSize: '13px',
                                            float: 'left'
                                        }}>{v}</div>
                                    ) : null
                                }
                            </div>
                        </div>
                        <div id="wine-quals" style={{ width: '70%', float: 'left', padding: '15px' }}>
                            {
                                Object.keys(qualities).map(qual => {
                                    return (

                                        <div key={`${qual}_bar`} style={{ width: '100%', height: '35px' }}>
                                            <div style={{
                                                height: '35px',
                                                width: '30%',
                                                float: 'left',
                                                textAlign: 'center',
                                                verticalAlign: 'middle',
                                                lineHeight: '30px'
                                            }}>
                                                <span style={{
                                                    fontSize: '11px',
                                                    padding: '4px',
                                                    color: this.props.wine[qual] > 1 ? 'gray' : ''
                                                }}>
                                                    {
                                                        this.props.wine[qual] <= 1 ? <b>{qualitiesB[qual].toUpperCase()}</b> : qualitiesB[qual].toUpperCase()
                                                    }
                                                </span>
                                            </div>
                                            <div style={{ height: '35px', width: '40%', float: 'left', position: 'relative', display: 'flex' }}>
                                                <div style={{ alignSelf: 'center', width: '100%', height: '3px', position: 'absolute', backgroundColor: '#eaeaea', borderRadius: '2px' }} />
                                                <div style={{ alignSelf: 'center', width: '7px', height: '7px', position: 'absolute', marginLeft: `calc(${this.props.wine[qual] * 25}% - 2px)`, borderRadius: '25px', zIndex: 0, backgroundColor: MAIN_COLOR }} />
                                            </div>
                                            <div style={{
                                                height: '35px',
                                                width: '30%',
                                                float: 'left',
                                                textAlign: 'center',
                                                verticalAlign: 'middle',
                                                lineHeight: '30px'
                                            }}>
                                                <span style={{
                                                    fontSize: '11px',
                                                    padding: '4px',
                                                    color: this.props.wine[qual] < 3 ? 'gray' : ''
                                                }}>
                                                    {
                                                        this.props.wine[qual] >= 3 ? <b>{qualities[qual].toUpperCase()}</b> : qualities[qual].toUpperCase()
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div id="wine-alcohol" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '30%', float: 'left', marginBottom: '15px', marginTop: '15px', height: `${4 * 35}px` }}>
                            <div>
                                <span style={{
                                    fontSize: '13px',
                                    textAlign: 'center',
                                    padding: '4px',
                                }}>
                                    ALCOHOL
                                </span>
                                <div style={{
                                    display: 'block', margin: 'auto'
                                }}>
                                    <span style={{ fontSize: '14px' }}>{this.props.wine['ALCOHOL']}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
                {/* </Card.Body> */}
            </Card >
        )
    }
}

export default WinePlate;