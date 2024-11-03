import { Text, SafeAreaView } from 'react-native'
import { styles } from './styles'

import Button from '../../../components/ui/Button'
import Typography from '../../../components/ui/Typography'


const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>WelcomeScreen</Text>
      <Button text='Button'/>
      <Typography>Hello</Typography>
    </SafeAreaView>
  )
}

export default WelcomeScreen