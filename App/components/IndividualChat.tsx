import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, Modal, Pressable } from "react-native";

import { Primary, Secondary, tertiary } from "../Global/Colors";
import ChatModal from "./ChatModal";
import { useAppContext } from "../Global/Context";
import usePictures from "../Hooks/usePictures";
import useMsgFetch from "../Hooks/useMsgFetch";

const IndividualChat = ({ data }) => {
  // Hooks
  const [Placeholder] = usePictures();
  const [Messages] = useMsgFetch(data);

  // States
  const [chatName, setChatName] = useState("");
  const [showModal, setshowModal] = useState(false);
  const context = useAppContext();

  const UserPicObtain =
    chatName &&
    context?.allUsersData?.find?.((data) => data.NickName === chatName)
      ?.ProfilePicture;

  const UserPic = UserPicObtain ? UserPicObtain : Placeholder;

  useEffect(() => {
    // if (chatName !== "") {
    //   return;
    // }
    // Setting Name of Chat
    if (data.ChatType === "DM") {
      setChatName(
        data.User1.ID === context.Current_UserID
          ? context?.UsersData?.find?.(
              (val: { User_ID: any }) => val.User_ID === data.User2.ID
            ).NickName
          : context?.UsersData?.find?.(
              (val: { User_ID: any }) => val.User_ID === data.User1.ID
            ).NickName
      );
    }
    if (data.ChatType === "Group") {
      setChatName(data.ChatName);
    }
    // eslint-disable-next-line
  }, [context.Current_UserID, context.UsersData, chatName]);

  useEffect(() => {
    // Setting active chat messages in a global store
    if (context.activeChat?.ChatID === data.ChatID) {
      context.setactiveChatData([...Messages]);
    }
    // eslint-disable-next-line
  }, [context.activeChat, Messages]);

  const makeChatActive = () => {
    context.setshowGifDiv(false);
    context.setActiveChatOtherUser(() => {
      if (data.ChatType === "Group") {
        return data.ChatName;
      }
      return data.User1.ID === context.Current_UserID
        ? context.UsersData.find((val) => val.User_ID === data.User2.ID)
        : context.UsersData.find((val) => val.User_ID === data.User1.ID);
    });
    context.setactiveChat(data);
  };

  const ContainerClickHandler = () => {
    setshowModal(true);
    makeChatActive();
  };

  return (
    <Pressable onPress={ContainerClickHandler}>
      <View style={styles.container}>
        <Image
          source={{
            uri: UserPic,
          }}
          style={styles.UserImage}
        />
        <View style={styles.Namediv}>
          <Text style={styles.Name}>{chatName}</Text>
          {Messages?.[Messages?.length - 1]?.Message === "Gif" ? (
            <Text style={styles.LastMessage}>Gif</Text>
          ) : (
            <Text style={styles.LastMessage}>
              {Messages?.[Messages?.length - 1]?.text.substring(0, 25)}
            </Text>
          )}
        </View>
        <View>
          <ChatModal show={showModal} setVisibility={setshowModal} />
          <Text></Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 7,
    flexDirection: "row",
    backgroundColor: Secondary,
    borderRadius: 20,
    padding: 5,
  },
  UserImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 3,
  },
  UserImageModal: {
    alignSelf: "center",
    marginVertical: 10,
  },
  Namediv: {
    marginLeft: 10,
  },
  Name: {
    fontSize: 20,
  },
  LastMessage: {
    fontSize: 22,
  },
});

export default IndividualChat;
