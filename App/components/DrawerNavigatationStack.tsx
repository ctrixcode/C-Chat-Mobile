import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import MaterialTopNavigatorStack from "./MaterialTopNavigatorStack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import { Secondary, tertiary } from "../Global/Colors";
import { View, Text, StyleSheet } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

export default function DrawerNavigatationStack() {
  const Drawer = createDrawerNavigator();
  const HeaderComponent = () => {
    return (
      <View style={headerStyle.container}>
        <FontAwesome5 name="search" size={24} color="red" />
      </View>
    );
  };
  const headerStyle = StyleSheet.create({
    container: {
      justifyContent: "center",
      backgroundColor: tertiary,
      flex: 1,
    },
  });

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={DrawerContent}>
        <Drawer.Screen
          name="Main"
          component={MaterialTopNavigatorStack}
          options={{
            headerShown: true,
            headerBackgroundContainerStyle: {
              backgroundColor: tertiary,
            },
            headerTitle: HeaderComponent,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
