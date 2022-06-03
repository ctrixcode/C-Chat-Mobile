import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Primary } from "../Global/Colors";
import IndividualChat from "./IndividualChat";
import { useAppContext } from "../Global/Context";

export default function ChatContainer() {
  const context = useAppContext();
  return (
    <ScrollView style={styles.container}>
      {context.privateChatInit &&
        context.privateChatInit.map((data) => (
          <IndividualChat key={data.ChatID} data={data} />
        ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: Primary,
    // flex: 1,
  },
});
