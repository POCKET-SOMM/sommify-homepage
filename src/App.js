import logo from './logo.svg';
import './App.scss';
import { Card, Button, Fade, ButtonGroup, Form, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MealIcon from './components/MealIcon';
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'
import Loadable from './components/Loadable';

const courses = [
  "appetizer",
  "main",
  "dessert"
]

const qualities = {
  'bodied': 'Bodied',
  'tannic': 'Tannic',
  'sweet': 'Sweet',
  'dry': 'Dry',
  'acid': 'Acidic'
}

const types = {
  'red': '#731624',
  'white': '#fadb7d',
  'sparkling': '#305432',
  'rose': '#e0c8df',
  'desert': '#adbdd9'
}

function App() {
  const [selected, setSelected] = useState('')
  const [rows, setRows] = useState([])
  const [meal, setMeal] = useState('')
  const [pair, setPair] = useState('')
  const [wining, setWining] = useState(false)
  const [advSearch, setAdvSearch] = useState(false)
  const [displayedWines, setDisplayedWines] = useState([])
  const [searchErr, setSearchErr] = useState('')


  const [filterWhite, setFilterWhite] = useState(true)
  const [filterRed, setFilterRed] = useState(true)
  const [filterSparkling, setFilterSparkling] = useState(true)
  const [filterRose, setFilterRose] = useState(true)
  const [filterDessert, setFilterDessert] = useState(true)

  useEffect(() => {
    async function getData() {
      const response = await fetch('/Roznavene-project-demo/data/frontend_data.csv')
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rows = results.data // array of objects
      console.log(rows)
      setRows(rows)
    }
    getData()
  }, [])

  const getAdvSearchHeight = () => {
    if (advSearch) {
      return 100
    }
    return 30
  }

  const categorySpan = () => {
    if (courses.includes(selected)) {
      return {
        'appetizer': 'appetizer',
        'main': 'main course',
        'dessert': 'dessert'
      }[selected]
    }
    return 'select a course'
  }

  const handleSelect = (course) => {
    if (selected === course) {
      setSelected('')
    } else {
      setSelected(course)
    }
  }

  const handleWineMe = () => {
    setPair(meal)
    setWining(true)

    const wines = rows.filter(e => e.pair && e.pair.toUpperCase() === meal.toUpperCase())
    setDisplayedWines(
      wines
    )

    setTimeout(
      function () {
        if (wines.length == 0)
          setSearchErr(`"${meal}" is not a supported dish`)
        else
          setSearchErr(false)
        setWining(false)
      },
      1000
    )
  }

  const imageLink = (link) => {
    let productNumber = link.split('/')[5]
    let productName = link.split('/')[6]
    return `https://images.alko.fi/images/cs_srgb,f_auto,t_products/cdn/${productNumber}/${productName}.jpg`
  }

  function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function WinePlate(wine) {
    const [hovered, setHovered] = useState(false)

    return (
      <Card
        onMouseEnter={e => { setHovered(true) }}
        onMouseLeave={e => { setHovered(false) }}
        onClick={e => { console.log(wine) }}
        border={hovered ? 'lightgray' : 'light'}
        bg="light"
        style={{
          width: '95%',
          margin: '10px',
          // boxShadow:`inset 37px 0px 1px -30px ${types[wine.type]}` 
        }}>
        <Card.Body style={{ padding: '15px' }}>
          <div style={{ height: '80px', marginBottom: '10px' }}>
            <img
              style={{
                float: 'left',
                transform: hovered ? 'scale(1.1)' : '',
                transition: 'transform 0.3s'
              }}
              src={imageLink(wine.link)}
              height="80px"
            />
            <div style={{ float: 'left', marginLeft: '20px', position: 'relative' }}>
              <span style={{ display: 'block', textOverflow: 'ellipsis', width: '250px', fontSize: '14px', textAlign: 'start' }}>
                <b>{truncate(wine.name.replaceAll('-', ' '), 100)}</b>
              </span>
              <div style={{ color: 'gray', left: '0px', position: 'absolute' }}>
                <span style={{ display: 'block', textAlign: 'start', fontSize: '14px' }}>
                  {capitalizeFirstLetter(wine.type)}
                </span>
                <span style={{ display: 'block', textAlign: 'start', fontSize: '14px' }}>
                  {wine.ALCOHOL}%
                </span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            {
              Object.keys(qualities).map(qual => {
                return (
                  <div style={{ float: 'left', width: '20%' }}>
                    <span style={{
                      fontSize: '13px',
                      textAlign: 'center',
                      padding: '4px'
                    }}>
                      {
                        wine[qual] > 1 ? <b>{qualities[qual]}</b> : qualities[qual]
                      }
                    </span>
                    <img
                      style={{ transform: "scale(-1, 1)", display: 'block', margin: 'auto' }}
                      src={`/Roznavene-project-demo/icons/intensity_pie_${wine[qual]}.svg`}
                      width='20px'
                    />
                  </div>
                )
              })
            }
          </div>
        </Card.Body>
      </Card >
    )
  }

  function WineDisplay() {
    return (
      <div
        className="no-scrollbar"
        id="wine-display">
        {
          displayedWines.map(wine =>
            WinePlate(wine)
          )
        }
      </div>
    )
  }

  return (
    <div className="App">
      <div className="mainBody">
        <Card>
          <Card.Body>
            <div style={{ height: '80px' }}>
              <b style={{ fontSize: '23px' }}>PocketSomm</b><br />
            </div>
            <div id="meal-select" style={{ display: 'none' }}>
              {
                courses.map((course) =>
                  <span onClick={e => handleSelect(course)}>
                    <MealIcon image={course} size={80} imgsize={50} selected={
                      selected === course
                    } />
                  </span>
                )
              }
              <h4 style={{ color: selected ? 'black' : 'gray' }} className="mt-2 mb-4">{categorySpan()}</h4>

            </div>

            <Form.Group>
              <Form.Label style={{ width: '79%', textAlign: 'start', fontSize: '17px' }}>
                What are you eating?
              </Form.Label>
              <Form.Control
                style={{ width: '80%', margin: 'auto', marginBottom: '10px' }}
                placeholder="enter a recipe link"
                onChange={e => setMeal(e.target.value)}
              />
            </Form.Group>
            {
              searchErr ? <Alert style={{ width: '80%', margin: 'auto' }} variant="danger">{searchErr}</Alert> : null
            }
            {/* {
              pair && !wining ? <div className="animated" style={{ width: '80%', margin: 'auto', height: `${getAdvSearchHeight()}px` }}>
                <a style={{ color: 'gray', fontSize: '13px' }} href="#" onClick={e => { setAdvSearch(!advSearch) }}>Adjust preference</a>
                <Fade in={advSearch}>
                  <div style={{ width: '90%', margin: 'auto' }}>
                    <h4 style={{ textAlign: 'left', fontSize: '20px' }}>Wine types</h4>
                    <ButtonGroup size="sm" className="mt-3">
                      <Button onClick={e => { setFilterWhite(!filterWhite) }} active={filterWhite} variant="outline-danger">White</Button>
                      <Button onClick={e => { setFilterRed(!filterRed) }} active={filterRed} variant="outline-danger">Red</Button>
                      <Button onClick={e => { setFilterSparkling(!filterSparkling) }} active={filterSparkling} variant="outline-danger">Sparkling</Button>
                      <Button onClick={e => { setFilterRose(!filterRose) }} active={filterRose} variant="outline-danger">Rose</Button>
                      <Button onClick={e => { setFilterDessert(!filterDessert) }} active={filterDessert} variant="outline-danger">Dessert</Button>
                    </ButtonGroup>
                  </div>
                </Fade>
              </div> : null
            } */}
            <div
              id="winelist"
              className="animated"
              style={{
                width: '90%',
                margin: 'auto',
                height: (pair && !wining && !searchErr) ? `${500 - getAdvSearchHeight()}px` : '0px',
                overflowY: 'auto',
                overflowX: 'hidden'
              }}>
              {pair && !wining ? <WineDisplay /> : null}
            </div>
          </Card.Body>
          <Card.Footer>
            <Button disabled={!meal} onClick={handleWineMe} variant="danger" style={{ width: '95%', height: '50px' }}>
              <Loadable loading={wining} component={<span>WINE ME </span>} />
            </Button>
          </Card.Footer>
        </Card>
        <div id="foot" style={{ position: 'relative', height: '5px' }}>
          <span style={{ right: '0px', position: 'absolute', fontSize: '13px', color: 'gray' }}>powered by PocketSomm™</span>
        </div>
      </div>
    </div>
  );
}

export default App;
