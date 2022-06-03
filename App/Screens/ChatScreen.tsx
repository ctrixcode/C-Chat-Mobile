import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import ChatContainer from "../components/ChatContainer";
import { Primary } from "../Global/Colors";

const ChatScreen = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <ChatContainer />
        {/* <Text>Hello</Text> */}
      </View>
    </ScreenContainer>
  );
};
export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Primary,
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 40,
    // flex: 1,
    // flexBasis: 1,
  },
});
