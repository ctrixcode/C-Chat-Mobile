import { View, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Primary, Secondary, tertiary } from "../Global/Colors";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAppContext } from "../Global/Context";
import { db } from "../Firebase/Firebase-config";

export default function MsgSendForChatModal({ scrollRef, scrollTrick }) {
  const context = useAppContext();
  const [Message, setMessage] = useState("");

  const MsgSendHandler = (data) => {
    let messageSnap;
    if (data.type === "text") {
      if (Message === "") {
        return;
      }
      messageSnap = Message;
      setMessage("");
    }
    const id = Date.now().toString();
    let LocRef;
    if (context.activeChat.ChatType === "DM") {
      LocRef = doc(
        db,
        "Messages",
        "Private_Chats",
        context.activeChat.ChatID,
        id
      );
    }
    if (context.activeChat.ChatType === "Group") {
      LocRef = doc(
        db,
        "Messages",
        "Group_Chats",
        context.activeChat.ChatID,
        id
      );
    }
    //

    const MsgObj = {
      ChatID: context.activeChat.ChatID,
      id: id,
      Sender: context.Current_UserID,
      createdAt: serverTimestamp(),
    };
    if (data.type === "text") {
      setDoc(LocRef, {
        ...MsgObj,
        text: messageSnap,
        Message: "Normal",
      });
    }
    if (data.type === "Gif") {
      setDoc(LocRef, {
        ...MsgObj,
        Message: "Gif",
        Gif: data.GifID,
      });
    }

    scrollTrick(false);
    // setTimeout(scrollRef.current.scrollToEnd(), 400);

    // scrollRef.current.scrollTo(1);
    // props.emptydiv.current.scrollIntoView({ smooth: true });
  };

  return (
    <View style={styles.MsgSendDiv}>
      <TextInput
        style={styles.MsgInput}
        placeholder="Type your Message"
        multiline
        value={Message}
        onChangeText={setMessage}
        onSubmitEditing={() => MsgSendHandler({ type: "text" })}
        // onChange={MessageValidationHandler}
      ></TextInput>
      {/* {Message !== "" && ( */}
      <Pressable
        style={styles.SendIconPressable}
        onPress={() => MsgSendHandler({ type: "text" })}
      >
        <MaterialCommunityIcons name="send-circle" size={65} color={Primary} />
      </Pressable>
      {/* )} */}
    </View>
  );
}
const styles = StyleSheet.create({
  MsgSendDiv: {
    // position: "absolute",
    // bottom: 4,
    // left: "20%",
    width: "100%",
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: tertiary,
    borderTopWidth: 1,
    paddingTop: 2,
    position: "relative",
  },
  MsgInput: {
    backgroundColor: Primary,
    padding: 15,
    fontSize: 20,
    // width: 260,
    // width: "85%",
    minWidth: "55%",
    maxWidth: "70%",
    borderRadius: 30,
    marginRight: 1,
    color: Secondary,
  },
  SendIconPressable: {
    position: "absolute",
    right: 1,
  },
});
