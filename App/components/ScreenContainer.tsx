import React from "react";
import { View, StyleSheet } from "react-native";
import { Primary } from "../Global/Colors";

interface CompProps {
  children: React.ReactNode;
  style?: object;
}

const ScreenContainer = ({ children, style }: CompProps) => {
  const styleMain = StyleSheet.create({
    container: {
      flex: 1,
      borderTopEndRadius: 70,
      borderTopLeftRadius: 70,
      paddingTop: 1,
      justifyContent: "space-between",
    },
  });
  const stylePassed: any = style ? StyleSheet.create({ style }) : null;
  const styles = style
    ? StyleSheet.compose(styleMain.container, stylePassed.style)
    : styleMain;
  return <View style={styles}>{children}</View>;
};

export default ScreenContainer;
