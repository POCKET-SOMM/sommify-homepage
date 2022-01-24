import React from 'react';
// import chroma from 'chroma-js';

// import { ColourOption, colourOptions } from '../data';
import Select, { createFilter } from 'react-select';
import { FixedSizeList as List } from "react-window";
import CustomOption from './CustomComponent';
import CustomMenuList from './CustomMenuList';

const optionObject = (option) => {
    return { value: option, label: option.replace(/\b\w/g, l => l.toUpperCase()) }
}
const resultLimit = 10
const height = 35;

class MenuList extends React.Component {
    render() {
        const { options, children, maxHeight, getValue } = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;

        return (
            <List
                height={maxHeight}
                itemCount={children.length}
                itemSize={height}
                initialScrollOffset={initialOffset}
            >
                {({ index, style }) => <div style={style}>{children[index]}</div>}
            </List>
        );
    }
}

// const CustomOption = ({ children, ...props }) => {
//     // eslint-disable-next-line no-unused-vars
//     const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
//     const newProps = { ...props, innerProps: rest };
//     return (
//         <components.Option {...newProps}>
//             {children}
//         </components.Option>
//     );
// };

// CustomOption.propTypes = {
//     innerProps: PropTypes.object.isRequired,
//     children: PropTypes.node.isRequired
// };

class TagSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phrases: [],
            selected: []
        }
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    readFile(file) {
        fetch(`Roznavene-project-demo/data/${file}.txt`)
            .then(response => response.text())
            .then(text => {
                var phraseList = text.split(',\r\n')
                phraseList = phraseList.map(e => {
                    return e.replace(/[^a-zA-Z ]+/g, '').trim()
                }).filter(e => e).filter(this.onlyUnique)

                console.log(phraseList)
                this.setState({
                    [file]: phraseList
                })
            })
    }

    componentDidMount() {
        this.readFile('phrases')
    }

    options() {
        return this.state.phrases.map(o => optionObject(o))
    }

    render() {
        let i = 0

        return (
            // <Select
            //     closeMenuOnSelect={false}
            //     defaultValue={[]}
            //     isMulti
            //     options={this.options()}
            //     placeholder="compose your meal"
            //     filterOption={({ label }, query) => {
            //         console.log('yo')
            //         if (label.indexOf(query) >= 0 && i++ < resultLimit)
            //             return true
            //         return false
            //     }} 
            //     onInputChange={() => { i = 0 }}
            // // styles={colourStyles}
            // />
            <Select
                onChange={e=>{this.setState({
                    selected: e
                })}}
                captureMenuScroll={false}
                classNamePrefix="clickable custom-select"
                filterOption={createFilter({ ignoreAccents: false })}
                isMulti
                placeholder="compose your meal"
                components={{
                    Option: CustomOption,
                    MenuList: CustomMenuList
                }}
                options={this.options()}
                isClearable
            />
        );
    }
}

export default TagSearch;