// import './App.scss';
import { Button, Fade, ButtonGroup, Form } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import * as Icon from 'react-bootstrap-icons';
// import TagSearch from './components/TagSearch';
import { createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable'
// import { FixedSizeList as List } from "react-window";
import CustomOption from './CustomComponent';
import CustomMenuList from './CustomMenuList';
import WinePlate from './WinePlate';
import { SERVER_URL } from '../App';

// const courses = [
//   "appetizer",
//   "main",
//   "dessert"
// ]

// const types = {
//   'red': '#731624',
//   'white': '#fadb7d',
//   'sparkling': '#305432',
//   'rose': '#e0c8df',
//   'desert': '#adbdd9'
// }

// const pairs = ['grilled food', 'pork', 'mutton, lamb', 'beef', 'savoury snacks',
//   'casseroles', 'chicken, turkey', 'lean fish',
//   'salads, vegetarian food', 'pasta and pizza', 'party wine',
//   'oriental food', 'buffet', 'strong cheeses', 'game', 'fatty fish',
//   'mild cheeses', 'spicy and meaty sausages', 'sushi',
//   'mild sausages', 'tapas and antipasti', 'berries and fruits',
//   'hot food', 'seafood', 'blini', 'sweet desserts',
//   'clams, mussels, scallops and oysters', 'chocolate desserts',
//   'mushrooms', 'soups', 'liver', 'game birds']

export const winePlateHeight = 90

function Body({ isMobile, screenWidth }) {
  const [meal] = useState('');
  const [pair, setPair] = useState('');
  const [recipe, setRecipe] = useState({});
  const [wining, setWining] = useState(false);
  const [allWines, setAllWines] = useState([]);
  const [displayedWines, setDisplayedWines] = useState([]);
  const [searchErr, setSearchErr] = useState('');
  const [priceRange, setPriceRange] = useState('$$');
  const [searchVisible, setSearchVisible] = useState(true);

  const [selectedTags, setSelectedTags] = useState([]);
  // const [phrases, setPhrases] = useState([]);
  // const [ings, setIngs] = useState([]);
  const [tags, setTags] = useState([])

  const [isMulti, setIsMulti] = useState(true);
  const [inputText, setInputText] = useState('')

  const wineMeRef = React.createRef();


  const optionObject = (option, index, type) => {
    return {
      value: option,
      label: option.replace(/\b\w/g, l => l.toUpperCase()),
      type: type,
      index: index
    }
  }

  useEffect(() => {
    readFile('TAGS', (text) => {
      let meals = text.split('\n').filter(onlyUnique).map((e, i) => optionObject(e, i, 'meal'))
      readFile('INGS', (text) => {
        let ings = text.split('\n').filter(onlyUnique).map((e, i) => optionObject(e, i, 'ingredient'))
        setTags(meals.concat(ings))
      })
    })

  }, [])

  const priceIndex = (level) => {
    return {
      '$': 0,
      '$$': 1,
      '$$$': 2
    }[level]
  }

  const handlePriceLevelChange = (level) => {
    setPriceRange(level)
    setDisplayedWines(allWines[priceIndex(level)])
    // setWining(true)

    // const IMAGES = allWines[priceIndex(level)].map(w => imageLink(w.link))
    // Promise.all(IMAGES.map(image => image ? loadImage(image) : null))
    //   .then(() => {
    //     setDisplayedWines(allWines[priceIndex(level)])
    //     setWining(false)
    //   })
    //   .catch(err => console.log("Failed to load images", err))
  }

  // const resetApp = () => {
  //   setPair('');
  //   setSearchVisible(true);
  //   setPriceRange('$$');
  //   setMeal('')
  //   // document.getElementById(
  //   //   'inlineFormInputGroup').value = ''
  // }

  const loadWines = (data) => {
    const wines = data.wines

    if (data.recipe) {
      setRecipe(data.recipe)
    } else {
      setRecipe({
        title: selectedTags.map(m => m.label).join(', ')
      })
    }

    if (wines.length === 3) {
      setAllWines(
        wines
      )
      setDisplayedWines(wines[priceIndex(priceRange)])
    } else {
      setAllWines([])
      setDisplayedWines(wines)
    }

    const IMAGES = wines.flat().map(w => imageLink(w.link))
    Promise.all(IMAGES.map(image => image ? loadImage(image) : null))
      .then(() => {
        setWining(false)
        // data.recipe && setSearchVisible(false)
        setSearchVisible(false)
      })
      .catch(err => console.log("Failed to load images", err))
  }

  const imageLink = (link) => {
    let productNumber = link.split('/')[5]
    let productName = link.split('/')[6]
    return `https://images.alko.fi/images/cs_srgb,f_auto,t_products/cdn/${productNumber}/${productName}.jpg`
  }

  function isLink(text) {
    var expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression)

    if (text.match(regex)) {
      return true
    } else
      return false
  }

  const loadImage = image => {
    return new Promise((resolve, reject) => {
      const loadImg = new Image()
      loadImg.src = image
      // wait 2 seconds to simulate loading time
      loadImg.onload = () =>
        setTimeout(() => {
          resolve(image)
        }, 2000)

      loadImg.onerror = err => reject(err)
    })
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function readFile(file, cb) {
    fetch(`data/${file}.txt`)
      .then(response => response.text())
      .then(cb)
  }

  function WineDisplay() {
    return (
      <div
        className="no-scrollbar"
        id="wine-display"
        style={{ width: '100%' }}>
        {
          displayedWines ? displayedWines.map((wine, i) =>
            <div key={`wine_display_${i}`} style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'start',
              paddingBottom: i === displayedWines.length - 1 ? '' : '10px'
            }}>
              <WinePlate wine={wine} />
            </div>
          ) : <span>No recommendations in this price range.</span>
        }
      </div>
    )
  }

  // const winelistHeight = () => {
  //   if (wining)
  //     return '0px'
  //   else if (pair) {
  //     return isMobile ? `calc(100vh - ${80 + 80 + 2 * 16 + 67 + 50}px)` : '500px'
  //   }
  //   else return '0px'
  //   // (pair && !wining && !searchErr) ? isMobile ? `calc(100vh - ${80 + 80 + 2 * 16 + 67 + 50}px)` : '500px' : '0px'
  // }

  const wineMeEnabled = () => {
    return !!selectedTags.length || (!!inputText && isLink(inputText))
  }

  const handleWineMe = (payload) => {
    setWining(true)
    var data, endpoint;

    if (isLink(payload[0].value)) {
      let link = payload[0].value
      setSelectedTags([{ value: link, label: link }])
      setPair(link)
      data = { link: link }
      endpoint = 'link2wine'
    } else {
      let tags = payload.map(p => p.value)
      setPair(tags)
      data = { tags: tags }
      endpoint = 'tags2wine'
    }

    const options = {
      method: 'POST',
      url: `${SERVER_URL}/api/v1/${endpoint}`,
      headers: { 'Content-Type': 'application/json' },
      data: data
    };

    axios.request(options).then(function (response) {
      console.log(response.data.wines)
      setSearchErr(false)
      // console.log(response.data)
      loadWines(response.data)
    }).catch(function (error) {
      setSearchErr(
        error.message === 'Request failed with status code 404' ?
          "" : error.message
      )
      if (error.response) {
        console.log(error.response.data)
        loadWines(error.response.data)
      } else {
        setWining(false)
      }
    });

    // const wines = rows.filter(e => e.pair && e.pair.toUpperCase() === meal.toUpperCase())
    // setDisplayedWines(
    //   wines
    // )

    // if (wines.length == 0)
    //   setTimeout(
    //     function () {
    //       if (wines.length == 0)
    //         setSearchErr(`"${meal}" is not a supported dish.\n Try searching "${pairs[Math.floor(Math.random() * pairs.length)]}" instead`)
    //       else
    //         setSearchErr(false)
    //       setWining(false)
    //     },
    //     1000
    //   )
    // else {
    //   setSearchErr(false)
    //   const IMAGES = wines.map(w => imageLink(w.link))

    //   Promise.all(IMAGES.map(image => image ? loadImage(image) : null))
    //     .then(() => {
    //       setWining(false)
    //     })
    //     .catch(err => console.log("Failed to load images", err))
    // }
  }

  const handleInputChange = (input) => {
    setInputText(input)
    let newTags = tags.sort((a, b) => {
      let a_i = a.value.indexOf(input.toLowerCase())
      let b_i = b.value.indexOf(input.toLowerCase())
      if (a_i === b_i) {
        return a.index - b.index
      } else {
        return a_i - b_i
      }
    })
    setTags(newTags)
  }

  const toLinkMode = (input) => {
    setSelectedTags(
      (!Array.isArray(input) && input) || input[input.length - 1]
    )
    setIsMulti(false)
    handleWineMe(input)
  }

  const toTagMode = (input) => {
    setSelectedTags(input)
    setIsMulti(true)
  }

  const handleTagChange = (tags, action) => {
    // console.log(tags, action)
    if (!tags || !tags.length) {
      setSelectedTags([])
      setIsMulti(true)
      return
    }

    let isObject = !Array.isArray(tags)

    if ((isObject && isLink(tags.value)) || (isLink(tags[tags.length - 1].value))) {
      toLinkMode(tags)
    } else {
      toTagMode(tags)
    }
  }

  const inputWidth = () => {
    if (isMobile) {
      // border + 
      return (screenWidth - 4) * 0.95 - 10 - 36 - 16
    } else {
      return 313.39
    }
  }

  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div id="body-header" style={{ minHeight: `${searchErr ? '88' : '68'}px` }}>
        <div id="body-query" style={{ minHeight: '68px', width: isMobile ? '95%' : '80%', margin: 'auto', textAlign: 'start' }}>
          {/* <Fade in={!recipe['title'] || wining}> */}
          <Form.Label
            style={{
              textAlign: 'start',
              fontSize: '14px',
              marginBottom: '0px',
              paddingLeft: '6px'
            }}>
            WHAT ARE YOU EATING?
          </Form.Label>
          {/* </Fade> */}
          {/* <Form.Label style={{ width: '79%', textAlign: 'start', fontSize: recipe['title'] ? '16px' : '14px' }}>
                {recipe['title'] ? <b>{recipe['title'].toUpperCase()}</b> : 'WHAT ARE YOU EATING?'}
              </Form.Label> */}

          <Fade in={!searchVisible}>
            <div style={{ display: !searchVisible ? 'flex' : 'none', height: '43px', alignItems: 'center' }}>
              <Form.Label style={{
                textAlign: 'start',
                fontSize: '16px',
                width: 'calc(100% - 25px)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                float: 'left'
              }}>
                <b>{recipe['title'] ? recipe['title'].toUpperCase() : ''}</b>
              </Form.Label>
              <Icon.X
                className="clickable nodrag"
                style={{ marginLeft: '5px' }}
                size={20}
                color='gray'
                onClick={e => { setSearchVisible(true) }} />
            </div>
          </Fade>

          <Fade in={searchVisible}>
            <div style={{ display: searchVisible ? '' : 'none', padding: '5px', paddingTop: '0px', zIndex: 2, position: 'relative' }}>
              <CreatableSelect
                // isValidNewOption={input=>isLink(inputText)}
                formatCreateLabel={input => {
                  if (isLink(input))
                    return 'Use recipe link'
                  else return `Create "${inputText}"`
                }}
                // menuIsOpen={inputText && !isLink(inputText)}
                value={selectedTags}
                onChange={handleTagChange}
                onInputChange={handleInputChange}
                captureMenuScroll={false}
                classNamePrefix={`clickable custom-select`}
                filterOption={createFilter({ ignoreAccents: false })}
                openMenuOnClick={false}
                isMulti={isMulti}
                placeholder="search meal or paste recipe link"
                styles={{
                  input: (css) => {
                    return ({
                      ...css,
                      flex: "1 1 auto",
                      /* expand the Input Component child div */
                      "> div": {
                        width: '100% !important'
                      },
                      /* expand the Input Component input */
                      input: {
                        width: (!selectedTags || !selectedTags.length) ? `${inputWidth()}px !important` : '',
                        textAlign: "left !important",
                      }
                    })
                  },
                  // multiValue: (styles, { data }) => {
                  //   const color = data.type === 'meal' ? '#425180' : '#714580'
                  //   const bgColor = data.type === 'meal' ? '#e9ebf5' : '#f2e9f5'
                  //   return {
                  //     ...styles,
                  //     outline: '1px solid',
                  //     outlineColor: color,
                  //     backgroundColor: bgColor
                  //   }
                  // }
                }}
                components={{
                  Option: CustomOption,
                  MenuList: CustomMenuList,
                  // MultiValue: CustomMultiValue
                }}
                options={tags}
                isClearable
              />
            </div>
            {/* <InputGroup style={{
                    display: searchVisible ? '' : 'none',
                    margin: 'auto'
                  }} >
                    <InputGroup.Text>🍽️</InputGroup.Text>
                    <FormControl onChange={e => setMeal(e.target.value)} id="inlineFormInputGroup" placeholder="enter recipe link" />
                  </InputGroup> */}
          </Fade>
          {
            (isLink(meal) && meal) ? <div style={{ width: '80%', margin: 'auto' }}>
              <span style={{ color: 'darkred', float: 'left', fontSize: '12px', margin: '2px' }}>
                * corked link
              </span>
            </div> : null
          }
          <div id="error-message" style={{ height: '24px', display: !!searchErr && !wining ? '' : 'none' }}>
            <span style={{ fontSize: '13px', color: 'red' }}>{searchErr}</span>
          </div>
        </div>
      </div>

      <Fade id="body-winelist-$-levels" in={!wining && !!pair && !searchErr}>
        <div style={{
          display: !wining && !!pair && !searchErr ? 'flex' : 'none',
          height: '30px',
          paddingBottom: '10px',
          alignItems: 'start',
          justifyContent: 'center'
        }}>
          <ButtonGroup aria-label="Basic example">
            {
              ["$", "$$", "$$$"].map(level =>
                <Button
                  key={level}
                  disabled={allWines.length===0}
                  onClick={e => {
                    handlePriceLevelChange(level)
                  }}
                  size="sm"
                  variant="outline-danger"
                  active={priceRange === level}
                  style={{
                    opacity: allWines.length===0 ? '0' : '1',
                    padding: '0px',
                    width: '45px',
                    height: '20px',
                    fontSize: '14px',
                    lineHeight: '20px'
                  }}
                >{level}
                </Button>
              )
            }
          </ButtonGroup>
        </div>
      </Fade>

      <div id="body-winelist"
        className={`animated winelist ${isMobile ? '' : 'hiddenScroll'}`}
        style={{
          width: '100%',
          // height: winelistHeight(),
          selfAlign: 'start',
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: displayedWines.length && !wining ? `${3 * 10 + 4 * 102}px` : '0px'
        }}>
        {
          ['$', '$$', '$$$'].map(e =>
            <Fade key={`${e}_display`} in={!wining && priceRange === e}>
              <div style={{ display: !wining && priceRange === e ? '' : 'none' }}>
                <WineDisplay />
              </div>
            </Fade>
          )
        }
      </div>

      {/* <div style={{ margin: 'auto' }}></div> */}
      <div id="body-footer" style={{
        width: '100%',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
        backgroundColor: 'white',
        padding: '5px',
        paddingTop: '10px'
      }}>
        <Button
          type="submit"
          disabled={!wineMeEnabled()}
          onClick={e => { handleWineMe(selectedTags) }}
          variant="danger"
          ref={wineMeRef}
          style={{ width: '95%', height: '45px', zIndex: 0 }}>
          <span>
            {
              wining ? <div>
                <div className="rotate-center" style={{ display: 'inline-flex', marginRight: '8px' }}>🍷</div><span>PAIRING...</span>
              </div>
                : 'WINE ME'
            }
          </span>
          {/* {
                wining ? <div>
                  <span>🍷</span>
                  <span>PAIRING...</span>
                </div> : <span>WINE ME</span>
              } */}
          {/* <Loadable loading={wining} component={<span>WINE ME </span>} /> */}
        </Button>
      </div>

    </div>
  );
}

export default Body;
