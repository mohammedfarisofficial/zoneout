import {View, Text, Button as NativeButton} from 'react-native';

interface Props {
    text:string;
}

const Button = ({text}: Props) => {
  return <NativeButton title={text} />;
};

export default Button;
