import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ChatScreen from "../Screens/ChatScreen";
import ContactScreen from "../Screens/ContactScreen";

export default function MaterialTopNavigatorStack() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={ChatScreen} />
      <Tab.Screen name="Contacts" component={ContactScreen} />
    </Tab.Navigator>
  );
}
