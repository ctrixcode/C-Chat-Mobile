import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import MainApp from "./App/MainApp";
import LoginScreen from "./App/Screens/LoginScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./App/Firebase/Firebase-config";
import { ContextWrapper } from "./App/Global/Context";

export default function App() {
  // if (UserLogged) {
  return (
    <ContextWrapper>
      <MainApp />
    </ContextWrapper>
  );
  // }
  // return <LoginScreen />;
}
