import { components } from 'react-select';

const CustomInput = (props) => {
  const { maxLength } = props.selectProps;
  const inputProps = { ...props, maxLength };
  console.log(props)

  return <components.Input {...inputProps} placeholder={'keep typing...'} />;
};

export default CustomInput;
