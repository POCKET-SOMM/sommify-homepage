import { Button, Fade, ButtonGroup, Form, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgClose } from 'react-icons/cg';
import { BiDollar } from 'react-icons/bi';
import { createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import CustomOption from './CustomOption';
import CustomMenuList from './CustomMenuList';
import WinePlate from './WinePlate2';
import colors from '../data/colors';

export const winePlateHeight = 90;
const SERVER_URL = 'https://pocketsommapi.azurewebsites.net';

function Widget({ isMobile, screenWidth }) {
  const [meal] = useState('');
  const [pair, setPair] = useState('');
  const [recipe, setRecipe] = useState({});
  const [wining, setWining] = useState(false);
  const [allWines, setAllWines] = useState([]);
  const [displayedWines, setDisplayedWines] = useState([]);
  const [searchErr, setSearchErr] = useState('');
  const [priceRange, setPriceRange] = useState(1);
  const [searchVisible, setSearchVisible] = useState(true);

  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  const [isMulti, setIsMulti] = useState(true);
  const [inputText, setInputText] = useState('');

  const wineMeRef = React.createRef();

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
        setTags(response.data.tags.map((e, i) => optionObject(e, i, 'ingredient')));
      })
      .catch(function (error) {
        console.error(error);
      });

    // readFile('TAGS', (text) => {
    //   let meals = text
    //     .split('\n')
    //     .filter(onlyUnique)
    //     .map((e, i) => optionObject(e, i, 'meal'));
    //   readFile('INGS', (text) => {
    //     let ings = text
    //       .split('\n')
    //       .filter(onlyUnique)
    //       .map((e, i) => optionObject(e, i, 'ingredient'));
    //     setTags(meals.concat(ings));
    //   });
    // });
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

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function readFile(file, cb) {
    fetch(`data/${file}.txt`)
      .then((response) => response.text())
      .then(cb);
  }

  function WineDisplay() {
    return (
      <div className='no-scrollbar' id='wine-display' style={{ width: '100%' }}>
        {displayedWines ? (
          displayedWines.map((wine, i) => (
            <div
              key={`wine_display_${i}`}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                paddingBottom: i === displayedWines.length - 1 ? '' : '4px',
              }}
            >
              <WinePlate wine={wine} />
            </div>
          ))
        ) : (
          <span>No recommendations in this price range.</span>
        )}
      </div>
    );
  }

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
      // border +
      return (screenWidth - 4) * 0.95 - 10 - 36 - 16;
    } else {
      return 313.39;
    }
  };

  return (
    <>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          id='body-header'
          style={{ minHeight: `${searchErr ? '88' : '68'}px` }}
        >
          <div
            id='body-query'
            style={{
              minHeight: '68px',
              width: isMobile ? '95%' : '95%',
              margin: 'auto',
              textAlign: 'start',
            }}
          >
            <Form.Label
              style={{
                textAlign: 'start',
                // fontSize: '14px',
                fontWeight: 600,
                // marginBottom: '0px',
                opacity: 0.8,
                marginLeft: '5px',
                paddingLeft: '6px',
              }}
            >
              Let us recommend you a bottle
            </Form.Label>

            <Fade in={!searchVisible}>
              <div
                style={{
                  display: !searchVisible ? 'flex' : 'none',
                  height: '53px',
                  alignItems: 'center',
                }}
              >
                <Form.Label
                  style={{
                    textAlign: 'start',
                    fontSize: '16px',
                    width: 'calc(100% - 25px)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    float: 'left',
                  }}
                >
                  <b>{recipe['title'] ? recipe['title'].toUpperCase() : ''}</b>
                </Form.Label>
                <CgClose
                  className='clickable nodrag'
                  style={{ marginLeft: '5px' }}
                  size={20}
                  color='gray'
                  onClick={(e) => {
                    setSearchVisible(true);
                  }}
                />
              </div>
            </Fade>

            <Fade in={searchVisible}>
              <div
                style={{
                  display: searchVisible ? '' : 'none',
                  padding: '5px',
                  paddingTop: '0px',
                  zIndex: 2,
                  position: 'relative',
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
                  placeholder='search meal or paste recipe link'
                  styles={{
                    control: (css) => ({
                      ...css,
                      border: '1px solid #f5f5f5',
                      backgroundColor: '#f5f5f5',
                      //   height: '50px',
                      paddingBlock: '5px',
                      borderRadius: '25px',
                    }),
                    multiValueLabel: (css) => ({
                      ...css,
                      color: 'white',
                    }),
                    multiValue: (css) => ({
                      ...css,
                      borderRadius: '50px',
                      color: 'white',
                      background: '#1f202b',
                      padding: '1px 4px',
                      fontSize: '16px',
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
            {isLink(meal) && meal ? (
              <div style={{ width: '80%', margin: 'auto' }}>
                <span
                  style={{
                    color: 'darkred',
                    float: 'left',
                    fontSize: '12px',
                    margin: '2px',
                  }}
                >
                  * corked link
                </span>
              </div>
            ) : null}
            <div
              id='error-message'
              style={{
                height: '24px',
                display: !!searchErr && !wining ? '' : 'none',
              }}
            >
              <span style={{ fontSize: '13px', color: 'red' }}>
                {searchErr}
              </span>
            </div>
          </div>
        </div>

        <Fade id='body-winelist-$-levels' in={!wining && !!pair && !searchErr}>
          <div
            style={{
              display: !wining && !!pair && !searchErr ? 'flex' : 'none',
              height: '30px',
              paddingBlock: '20px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {[0, 1, 2].map((level) => (
              <div
                key={level}
                disabled={allWines.length === 0}
                onClick={() => {
                  setPriceRange(level);
                  setDisplayedWines(allWines[level]);
                }}
                size='sm'
                variant='outline-danger'
                style={{
                  opacity: allWines.length === 0 ? 0 : 1,
                  padding: '0px',
                  width: '50px',
                  marginInline: '15px',
                  height: '20px',
                  color: priceRange === level ? colors.primary : '#afafaf',
                  borderBottom: `2px solid ${
                    priceRange === level ? colors.primary : 'rgba(0,0,0,0)'
                  }`,
                }}
                className='d-flex justify-content-center align-items-center clickable'
              >
                <BiDollar size={13} />
                <BiDollar size={13} style={{ opacity: level < 1 ? 0.35 : 1 }} />
                <BiDollar size={13} style={{ opacity: level < 2 ? 0.35 : 1 }} />
              </div>
            ))}
          </div>
        </Fade>

        <div
          id='body-winelist'
          className={`animated winelist ${isMobile ? '' : 'hiddenScroll'}`}
          style={{
            width: '100%',
            // height: winelistHeight(),
            selfAlign: 'start',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: displayedWines.length && !wining ? `${4 * 88}px` : '0px',
          }}
        >
          {[0, 1, 2].map((e) => (
            <Fade key={`${e}_display`} in={!wining && priceRange === e}>
              <div
                style={{ display: !wining && priceRange === e ? '' : 'none' }}
              >
                <WineDisplay />
              </div>
            </Fade>
          ))}
        </div>

        <div
          id='body-footer'
          style={{
            width: '100%',
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'end',
            backgroundColor: 'white',
            padding: '5px',
            paddingTop: '10px',
          }}
        >
          <Button
            type='submit'
            disabled={!wineMeEnabled()}
            onClick={(e) => {
              handleWineMe(selectedTags);
            }}
            ref={wineMeRef}
            style={{
              width: '95%',
              height: '45px',
              zIndex: 0,
              fontWeight: 600,
              fontSize: '13px',
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
    </>
  );
}

export default Widget;
