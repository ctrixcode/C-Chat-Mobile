import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { tertiary } from "./Global/Colors";

import { useAppContext } from "./Global/Context";
import LoginScreen from "./Screens/LoginScreen";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./Firebase/Firebase-config";
import DrawerNavigatationStack from "./components/DrawerNavigatationStack";

export default function MainApp() {
  const contextData = useAppContext();

  // Checking if user is Signed In

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUserLogged(true);
        contextData.setIsUserSignIn(true);
      }
    });
  }, [auth]);

  return (
    <>
      {contextData.isUserSignIn ? (
        <View style={styles.container}>
          <StatusBar backgroundColor={tertiary} />
          <DrawerNavigatationStack />
        </View>
      ) : (
        <LoginScreen />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: tertiary,
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
});
