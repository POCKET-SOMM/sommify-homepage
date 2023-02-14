import { Button, Fade, ButtonGroup, Form, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgArrowLeft, CgClose } from 'react-icons/cg';
import { BiDollar } from 'react-icons/bi';
import { createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import CustomOption from './CustomOption';
import CustomMenuList from './CustomMenuList';
import WinePlate from './WinePlate';
import colors from '../../data/colors';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import useWindowDimensions from '../../hooks';
import { isBrowser } from 'react-device-detect';
import logo from '../../assets/logo/socials_maroon.svg';
import { CircleFlag } from 'react-circle-flags';
import _ from 'lodash';
import CustomPlaceholder from './CustomPlaceholder';
import CustomValueContainer from './CustomValueContainer';
import CustomInput from './CustomInput';

import AdventurousIcon from '../../assets/icons/adventurous.png';
import PremiumIcon from '../../assets/icons/premium.png';
// import TraditionalIcon from '../../assets/icons/wine.png';

function Widget({ isMobile, screenWidth }) {
  const { width, height } = useWindowDimensions();
  const [meal] = useState('');
  const [pair, setPair] = useState('');
  const [recipe, setRecipe] = useState({});
  const [wining, setWining] = useState(false);
  const [allWines, setAllWines] = useState(null);
  const [displayedWines, setDisplayedWines] = useState(null);
  const [searchErr, setSearchErr] = useState(false);
  const [pairingType, setPairingType] = useState('traditional');
  const [searchVisible, setSearchVisible] = useState(true);

  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  const [isMulti, setIsMulti] = useState(true);
  const [inputText, setInputText] = useState('');

  const wineMeRef = React.createRef();

  const WIDGET_WIDTH = width <= 1920 ? '450px' : '600px';
  const controls = useAnimationControls();

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

  const loadWines = (wines) => {
    setRecipe({
      title: selectedTags.map((m) => m.label).join(', '),
    });

    setAllWines(wines);
    setDisplayedWines(wines[pairingType]);

    let IMAGES = wines['traditional'].concat(
      wines['premium'],
      wines['adventurous']
    );
    IMAGES = IMAGES.map((w) => imageLink(w.url));
    Promise.all(IMAGES.map((image) => (image ? loadImage(image) : null)))
      .then(() => {
        setWining(false);
        setSearchVisible(false);
      })
      .catch((err) => {
        console.log('Failed to load images', err);
        setWining(false);
        setSearchVisible(false);
      });
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
    if (!payload.length) {
      setSearchErr('Please enter a meal...');
      controls.start({
        x: [-3, 3, -3, 0],
        transition: { type: 'spring', duration: 0.2 },
      });
      return;
    } else {
      setSearchErr(false);
    }

    setWining(true);
    let tags = payload.map((p) => p.value);
    setPair(tags);

    // if (isLink(payload[0].value)) {
    //   let link = payload[0].value;
    //   setSelectedTags([{ value: link, label: link }]);
    //   setPair(link);
    //   data = { link: link };
    //   endpoint = 'link2wine';
    // } else {
    // let tags = payload.map((p) => p.value);
    // setPair(tags);
    // data = { tags: tags };
    // endpoint = 'tags2wine';
    // }

    const options = {
      method: 'POST',
      url: `https://api.sommify.ai/a/sommelier/v1/tag/categorized-matches`,
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': 'sommelier',
      },
      data: { tags, limit: 3 },
    };

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
        setWining(false);
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
    if (width < 760) {
      return (screenWidth - 4) * 0.95 - 10 - 36 - 16;
    } else {
      return 313.39;
    }
  };

  return (
    <div
      className='shaded position-relative'
      style={{
        width: isBrowser ? WIDGET_WIDTH : '85vw',
        background: 'white',
        borderRadius: isBrowser ? '2vw' : '4vw',
        padding: isBrowser ? '30px' : '5vw',
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
          <div className='pb-4 w-100 d-flex justify-content-center'>
            <img
              src={logo}
              style={{
                height: '3em',
              }}
            />
          </div>
          <div
            id='body-query'
            style={{
              width: '100%',
              textAlign: 'start',
            }}
          >
            <motion.div animate={controls}>
              <h5
                className='mb-1'
                style={{
                  textAlign: 'start',
                  fontWeight: 600,
                  fontSize: '.9em',
                  color: '#909090',
                }}
              >
                {searchErr ? (
                  <span style={{ color: 'purple' }}>{searchErr}</span>
                ) : (
                  'Wines that go well with...'
                )}
              </h5>
            </motion.div>
            {!searchVisible && (
              <motion.div
                key='recipe-title'
                className='d-flex align-items-center'
                style={{
                  height: '3.2rem',
                }}
              >
                <motion.div
                  className='rounded-circle p-1 d-flex justify-content-center align-items-center shaded clickable'
                  style={{ marginRight: '10px', background: '#f8f8f8' }}
                  animate={{ background: '#f0f0f0', color: '#999' }}
                  whileHover={{ background: '#fff', color: '#111' }}
                  onClick={() => {
                    setSearchVisible(true);
                    setAllWines(null);
                    setDisplayedWines(null);
                    setSelectedTags([]);
                  }}
                >
                  <CgArrowLeft size='1.5em' />
                </motion.div>
                <span
                  style={{
                    textAlign: 'start',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    float: 'left',
                  }}
                >
                  <b>{recipe['title']?.toUpperCase()}</b>
                </span>
                {/* <CgClose
                  className='clickable nodrag'
                  style={{ marginLeft: '5px' }}
                  size={20}
                  color='gray'
                  onClick={() => {
                    setSearchVisible(true);
                  }}
                /> */}
              </motion.div>
            )}

            {searchVisible && (
              <motion.div
                key='recipe-select'
                style={{
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
                  isMulti={true}
                  // isSearchable={selectedTags.length < 5}
                  placeholder={
                    <span
                      className='position-relative'
                      style={{ paddingLeft: '1.5em' }}
                    >
                      <CircleFlag
                        style={{
                          height: '1.2em',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                        }}
                        countryCode='us'
                      />{' '}
                      Type in what you're eating
                    </span>
                  }
                  styles={{
                    control: (css, state) => ({
                      ...css,
                      border: '1px solid #f5f5f5',
                      backgroundColor: '#f5f5f5',
                      minHeight: '3.2rem',
                      padding: '0px 5px',
                      borderRadius: '2em',
                      boxShadow: state.isFocused
                        ? '0 0 0 1px ' + colors.primary
                        : 0,
                      fontSize: '.85em',
                      ':active, :hover': {
                        borderColor: colors.primary,
                      },
                    }),
                    multiValueLabel: (css) => ({
                      ...css,
                      color: 'white',
                      fontSize: '1.1em',
                    }),
                    multiValue: (css) => ({
                      ...css,
                      borderRadius: 999,
                      color: 'white',
                      background: '#3b3d52',
                      padding: '0.1em 0.3em',
                      // boxShadow: '0 2px 6px -5px black',
                      // border: '2px solid black',
                      // fontSize: '16px',
                    }),
                    multiValueRemove: (css) => ({
                      ...css,
                      ':hover': {
                        backgroundColor: 'none',
                        color: '#b5b5b5',
                      },
                    }),
                  }}
                  components={{
                    Option: CustomOption,
                    MenuList: CustomMenuList,
                    // ValueContainer: CustomValueContainer,
                    // Placeholder: CustomPlaceholder,
                  }}
                  options={tags}
                  isClearable
                />
                <div
                  className='w-100 px-3 py-1'
                  style={{ height: '.7em', fontSize: '.6em' }}
                >
                  <AnimatePresence>
                    {selectedTags?.length && !wining && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          color: selectedTags.length == 5 ? '#f44' : '#777',
                        }}
                        exit={{ opacity: 0 }}
                      >
                        {/* <b>{selectedTags?.length}/100</b> */}
                        {/* &nbsp; */}
                        <span>Add more tags for better pairings</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <AnimatePresence>
          {wining || allWines === null ? null : (
            <motion.div
              key='pairing-type-select'
              animate={{ opacity: !wining && !searchErr ? 1 : 0 }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ opacity: { duration: 0.05 } }}
              style={{
                display: !wining && !searchErr ? 'flex' : 'none',
                width: '90%',
                marginInline: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                height: '2.4em',
                fontSize: '0.8em',
              }}
            >
              {[
                { type: 'traditional' },
                { type: 'premium', icon: PremiumIcon },
                { type: 'adventurous', icon: AdventurousIcon },
              ].map(({ type, icon }) => (
                <motion.div
                  animate={{
                    opacity: allWines === null ? 0 : 1,
                    color:
                      type === pairingType ? 'rgb(0,0,0)' : 'rgb(200,200,200)',
                    background:
                      type === pairingType
                        ? 'rgb(250,250,250)'
                        : 'rgba(256,256,256,0)',
                  }}
                  onClick={() => {
                    setPairingType(type);
                    setDisplayedWines(allWines[type]);
                  }}
                  whileHover={{ background: 'rgb(250,250,250)' }}
                  key={type + '_button'}
                  disabled={allWines === null}
                  size='sm'
                  variant='outline-danger'
                  style={{
                    borderRadius: '.5vw .5vw 0 0',
                    background: 'rgb(256,256,256)',
                    fontSize: '0.9em',
                    flex: 1,
                  }}
                  className='d-flex justify-content-center align-items-center clickable h-100 position-relative font-weight-600'
                >
                  {/* <img
                    src={icon}
                    style={{
                      height: '18px',
                      marginRight: '3px',
                      filter: pairingType === type ? '' : 'grayscale(100)',
                    }}
                  /> */}
                  {type}
                  {type === pairingType && (
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

        <motion.div
          id='body-winelist'
          className='no-scrollbar'
          animate={{ height: 'auto' }}
          style={{
            width: '100%',
            selfAlign: 'start',
            overflowY: 'auto',
            overflowX: 'hidden',
            // height:
            //   displayedWines?.length && !wining ? `calc(3 * 6.25em)` : '0px',
            overscrollBehavior: 'contain',
          }}
        >
          <AnimatePresence>
            {displayedWines?.length &&
              !wining &&
              displayedWines
                .slice(0, 3)
                .map((wine, i) => (
                  <WinePlate key={`wine_display_${i}`} wine={wine} />
                ))}
          </AnimatePresence>
        </motion.div>

        {(allWines === null || wining) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              // disabled={!wineMeEnabled()}
              onClick={(e) => {
                handleWineMe(selectedTags);
              }}
              ref={wineMeRef}
              style={{
                width: '100%',
                fontWeight: 700,
                fontSize: '.9em',
                borderRadius: '1em',
                // boxShadow: '0 3px 0 ' + colors.primaryDark,
                // border: '2px solid ' + colors.primaryDark,
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
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Widget;
