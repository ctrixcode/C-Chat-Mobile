import {  View,StyleSheet,StatusBar } from 'react-native';
import ScreenContainer from './components/ScreenContainer';
import { tertiary } from './Global/Colors';
import ChatScreen from './Screens/ChatScreen';

export default function MainApp() {
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor={tertiary} />
    <ScreenContainer>
     <ChatScreen />
    </ScreenContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  backgroundColor: tertiary,
  flex: 1,
  paddingTop: StatusBar.currentHeight,
}
})
