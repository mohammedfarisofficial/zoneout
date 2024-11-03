import { Text } from 'react-native'

interface Props{
    children: string | number
}
const Typography = ({ children }: Props) => {
  return <Text>{children}</Text>
}

export default Typography