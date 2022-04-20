import {  View,StyleSheet,StatusBar } from 'react-native';
import { tertiary } from './Global/Colors';
import { NavigationContainer } from '@react-navigation/native';
import ChatRoom from "../App/Screens/ChatScreen"
import ContactScreen from '../App/Screens/ContactScreen';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function MainApp() {
  const Tab = createMaterialTopTabNavigator()
  return (
    <View style={styles.container}>
   <StatusBar backgroundColor={tertiary} />
    <NavigationContainer>
    <Tab.Navigator initialRouteName='Home'>
    <Tab.Screen name="Home" component={ChatRoom} />
    <Tab.Screen name="Contacts" component={ContactScreen} />
    </Tab.Navigator>
    </NavigationContainer> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  backgroundColor: tertiary,
  flex: 1,
  // paddingTop: StatusBar.currentHeight,
}
})
