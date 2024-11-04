import {View, Text, Button as NativeButton} from 'react-native';

interface Props {
    text:string;
    onPress:any
}

const Button = ({text,onPress}: Props) => {
  return <NativeButton title={text} onPress={onPress} />;
};

export default Button;
