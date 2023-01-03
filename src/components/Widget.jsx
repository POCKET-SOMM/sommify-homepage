import { Button, Fade, ButtonGroup, Form, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgClose } from 'react-icons/cg';
import { BiDollar } from 'react-icons/bi';
import { createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import CustomOption from './CustomOption';
import CustomMenuList from './CustomMenuList';
import WinePlate from './WinePlate';
import colors from '../data/colors';
import wines from '../data/wines';
import { AnimatePresence, motion } from 'framer-motion';
import useWindowDimensions from '../hooks';
import { isBrowser } from 'react-device-detect';
import logo from '../assets/logo/logo_white.svg';

export const winePlateHeight = 90;
const SERVER_URL = 'https://pocketsommapi.azurewebsites.net';

const initialWines = [[], [], []];
const initialPriceRange = 1;

function WineDisplay({ wines }) {
  return (
    <div id='wine-display' style={{ width: '100%' }}>
      {wines ? (
        wines.map((wine, i) => (
          <WinePlate key={`wine_display_${i}`} wine={wine} />
        ))
      ) : (
        <span>No recommendations in this price range.</span>
      )}
    </div>
  );
}

function Widget({ isMobile, screenWidth }) {
  const { width, height } = useWindowDimensions();
  const [meal] = useState('');
  const [pair, setPair] = useState('');
  const [recipe, setRecipe] = useState({});
  const [wining, setWining] = useState(false);
  const [allWines, setAllWines] = useState(initialWines);
  const [displayedWines, setDisplayedWines] = useState(
    initialWines[initialPriceRange]
  );
  const [searchErr, setSearchErr] = useState(false);
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [searchVisible, setSearchVisible] = useState(true);

  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  const [isMulti, setIsMulti] = useState(true);
  const [inputText, setInputText] = useState('');

  const wineMeRef = React.createRef();

  const WIDGET_WIDTH = width <= 1920 ? '450px' : '900px';

  const optionObject = (option, index, type) => {
    return {
      value: option,
      label: option.replace(/\b\w/g, (l) => l.toUpperCase()),
      type: type,
      index: index,
    };
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.sommify.ai/api/pantry/v1/recipe-tags',
    };

    axios
      .request(options)
      .then(function (response) {
        setTags(
          response.data.tags.map((e, i) => optionObject(e, i, 'ingredient'))
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const loadWines = (data) => {
    let wines = data.wines;

    if (data.recipe) {
      setRecipe(data.recipe);
    } else {
      setRecipe({
        title: selectedTags.map((m) => m.label).join(', '),
      });
    }

    if (wines.length === 3) {
      console.log(wines);
      wines = wines.map((wine) =>
        wine.filter((w) => !w.PACKAGING.includes('box'))
      );
      setAllWines(wines);
      setDisplayedWines(wines[priceRange]);
    } else {
      setAllWines([]);
      setDisplayedWines(wines);
    }

    const IMAGES = wines.flat().map((w) => imageLink(w.link));
    Promise.all(IMAGES.map((image) => (image ? loadImage(image) : null)))
      .then(() => {
        setWining(false);
        // data.recipe && setSearchVisible(false)
        setSearchVisible(false);
      })
      .catch((err) => console.log('Failed to load images', err));
  };

  const imageLink = (link) => {
    let productNumber = link.split('/')[5];
    let productName = link.split('/')[6];
    return `https://images.alko.fi/images/cs_srgb,f_auto,t_products/cdn/${productNumber}/${productName}.jpg`;
  };

  function isLink(text) {
    var expression =
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (text.match(regex)) {
      return true;
    } else return false;
  }

  const loadImage = (image) => {
    return new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = image;
      // wait 2 seconds to simulate loading time
      loadImg.onload = () =>
        setTimeout(() => {
          resolve(image);
        }, 2000);

      loadImg.onerror = (err) => reject(err);
    });
  };

  const wineMeEnabled = () => {
    return !!selectedTags.length || (!!inputText && isLink(inputText));
  };

  const handleWineMe = (payload) => {
    setWining(true);
    var data, endpoint;

    if (isLink(payload[0].value)) {
      let link = payload[0].value;
      setSelectedTags([{ value: link, label: link }]);
      setPair(link);
      data = { link: link };
      endpoint = 'link2wine';
    } else {
      let tags = payload.map((p) => p.value);
      setPair(tags);
      data = { tags: tags };
      endpoint = 'tags2wine';
    }

    const options = {
      method: 'POST',
      url: `${SERVER_URL}/api/v1/${endpoint}`,
      headers: { 'Content-Type': 'application/json' },
      data: data,
    };

    console.log(data);

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setSearchErr(false);
        loadWines(response.data);
      })
      .catch(function (error) {
        setSearchErr(
          error.message === 'Request failed with status code 404'
            ? ''
            : error.message
        );
        if (error.response) {
          console.log(error.response.data);
          loadWines(error.response.data);
        } else {
          setWining(false);
        }
      });
  };

  const handleInputChange = (input) => {
    setInputText(input);
    let newTags = tags.sort((a, b) => {
      let a_i = a.value.indexOf(input.toLowerCase());
      let b_i = b.value.indexOf(input.toLowerCase());
      if (a_i === b_i) {
        return a.index - b.index;
      } else {
        return a_i - b_i;
      }
    });
    setTags(newTags);
  };

  const toLinkMode = (input) => {
    setSelectedTags(
      (!Array.isArray(input) && input) || input[input.length - 1]
    );
    setIsMulti(false);
    handleWineMe(input);
  };

  const toTagMode = (input) => {
    setSelectedTags(input);
    setIsMulti(true);
  };

  const handleTagChange = (tags, action) => {
    // console.log(tags, action)
    if (!tags || !tags.length) {
      setSelectedTags([]);
      setIsMulti(true);
      return;
    }

    let isObject = !Array.isArray(tags);

    if (
      (isObject && isLink(tags.value)) ||
      isLink(tags[tags.length - 1].value)
    ) {
      toLinkMode(tags);
    } else {
      toTagMode(tags);
    }
  };

  const inputWidth = () => {
    if (isMobile) {
      return (screenWidth - 4) * 0.95 - 10 - 36 - 16;
    } else {
      return 313.39;
    }
  };

  return (
    <div
      style={{
        width: isBrowser ? WIDGET_WIDTH : '85vw',
        background: 'white',
        borderRadius: isBrowser ? '2vw' : '4vw',
        padding: isBrowser ? '2%' : '5vw',
        boxShadow: '1vw 1vw 2vw -1vw #00000085',
        color: '#202020',
        zIndex: 2,
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          fontSize: isBrowser ? '' : '13px',
        }}
      >
        <div id='body-header'>
          <div className='w-100 d-flex justify-content-center'>
            <div className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: '2.4em', height: '2.4em', marginBottom: '1.4em', background: colors.primary }}>
              <img src={logo} style={{ height: '80%' }} />
            </div>
          </div>
          <div
            id='body-query'
            style={{
              width: '100%',
              textAlign: 'start',
            }}
          >
            <h5
              style={{
                textAlign: 'start',
                fontWeight: 600,
                opacity: 0.8,
                fontSize: '1.1em',
              }}
            >
              Let us recommend you a bottle
            </h5>

            <Fade in={!searchVisible}>
              <div
                style={{
                  display: !searchVisible ? 'flex' : 'none',
                  height: '53px',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    textAlign: 'start',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    float: 'left',
                  }}
                >
                  <b>{recipe['title'] ? recipe['title'].toUpperCase() : ''}</b>
                </span>
                <CgClose
                  className='clickable nodrag'
                  style={{ marginLeft: '5px' }}
                  size={20}
                  color='gray'
                  onClick={() => {
                    setSearchVisible(true);
                  }}
                />
              </div>
            </Fade>

            <Fade in={searchVisible}>
              <div
                style={{
                  display: searchVisible ? '' : 'none',
                  position: 'relative',
                  fontSize: '1rem',
                }}
              >
                <CreatableSelect
                  formatCreateLabel={(input) => {
                    if (isLink(input)) return 'Use recipe link';
                    else return `Create "${inputText}"`;
                  }}
                  value={selectedTags}
                  onChange={handleTagChange}
                  onInputChange={handleInputChange}
                  captureMenuScroll={false}
                  classNamePrefix={`clickable custom-select`}
                  filterOption={createFilter({ ignoreAccents: false })}
                  openMenuOnClick={false}
                  isMulti={isMulti}
                  placeholder='search meals'
                  styles={{
                    control: (css, state) => ({
                      ...css,
                      border: '1px solid #f5f5f5',
                      backgroundColor: '#f5f5f5',
                      minHeight: '3.2em',
                      padding: '1% 3%',
                      borderRadius: '2em',
                      boxShadow: state.isFocused
                        ? '0 0 0 1px ' + colors.primary
                        : 0,
                      ':active, :hover': {
                        borderColor: colors.primary,
                      },
                    }),
                    multiValueLabel: (css) => ({
                      ...css,
                      color: 'white',
                    }),
                    multiValue: (css) => ({
                      ...css,
                      borderRadius: '9999px',
                      color: 'white',
                      background: '#1f202b',
                      padding: '0.1em 0.3em',
                      // fontSize: '16px',
                    }),
                    multiValueRemove: (css) => ({
                      ...css,
                      ':hover': {
                        backgroundColor: 'none',
                        color: '#b5b5b5',
                      },
                    }),
                    input: (css) => {
                      return {
                        ...css,
                        flex: '1 1 auto',
                        '> div': {
                          width: '100% !important',
                        },
                        input: {
                          width:
                            !selectedTags || !selectedTags.length
                              ? `${inputWidth()}px !important`
                              : '',
                          textAlign: 'left !important',
                        },
                      };
                    },
                  }}
                  components={{
                    Option: CustomOption,
                    MenuList: CustomMenuList,
                  }}
                  options={tags}
                  isClearable
                />
              </div>
            </Fade>
          </div>
        </div>
        <AnimatePresence>
          {wining || allWines.flat().length === 0 ? null : (
            <motion.div
              animate={{ opacity: !wining && !searchErr ? 1 : 0 }}
              className='mt-2'
              style={{
                display: !wining && !searchErr ? 'flex' : 'none',
                width: '90%',
                margin: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                height: '2.4em',
              }}
            >
              {[0, 1, 2].map((level) => (
                <motion.div
                  animate={{
                    opacity: allWines.length === 0 ? 0 : 1,
                    color:
                      priceRange === level
                        ? colors.primaryRgb
                        : 'rgb(200,200,200)',
                    background: priceRange === level ? 'rgb(250,250,250)' : '',
                  }}
                  whileHover={{ background: 'rgb(250,250,250)' }}
                  key={level}
                  disabled={allWines.length === 0}
                  onClick={() => {
                    setPriceRange(level);
                    setDisplayedWines(allWines[level]);
                  }}
                  size='sm'
                  variant='outline-danger'
                  style={{
                    borderRadius: '.5vw .5vw 0 0',
                  }}
                  className='d-flex justify-content-center align-items-center clickable flex-grow-1 h-100 position-relative'
                >
                  <BiDollar style={{ height: '1.6em' }} />
                  <BiDollar
                    style={{ height: '1.6em', opacity: level < 1 ? 0.35 : 1 }}
                  />
                  <BiDollar
                    style={{ height: '1.6em', opacity: level < 2 ? 0.35 : 1 }}
                  />
                  {priceRange === level && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: colors.primary,
                      }}
                      layoutId='underline'
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div
          id='body-winelist'
          className={`no-scrollbar animated winelist ${
            isMobile ? '' : 'hiddenScroll'
          }`}
          style={{
            width: '100%',
            selfAlign: 'start',
            overflowY: 'auto',
            overflowX: 'hidden',
            height:
              displayedWines.length && !wining ? `calc(4 * 5.5em)` : '0px',
            overscrollBehavior: 'contain',
          }}
        >
          {[0, 1, 2].map((e) => (
            <Fade key={`${e}_display`} in={!wining && priceRange === e}>
              <div
                style={{ display: !wining && priceRange === e ? '' : 'none' }}
              >
                <WineDisplay wines={displayedWines} />
              </div>
            </Fade>
          ))}
        </div>

        <div
          id='body-footer'
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'end',
            paddingTop: '5%',
          }}
        >
          <Button
            type='submit'
            className='py-3'
            disabled={!wineMeEnabled()}
            onClick={(e) => {
              handleWineMe(selectedTags);
            }}
            ref={wineMeRef}
            style={{
              width: '100%',
              fontWeight: 600,
              fontSize: '1em',
            }}
          >
            <span>
              {wining ? (
                <div className='d-flex justify-content-center align-items-center'>
                  <Spinner animation='border' size='sm' className='mx-2' />
                  <span>PAIRING...</span>
                </div>
              ) : (
                'WINE ME'
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Widget;
