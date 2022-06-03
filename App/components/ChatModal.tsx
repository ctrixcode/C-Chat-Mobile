import React, { useState, useEffect, useRef } from "react";
import ScreenContainer from "./ScreenContainer";
import { StyleSheet, Image, View, Modal, Text, ScrollView } from "react-native";
import { tertiary, Secondary } from "../Global/Colors";
import IndividualMessage from "./IndividualMessage";
import { useAppContext } from "../Global/Context";
import usePictures from "../Hooks/usePictures";
import MsgSendForChatModal from "./MsgSendForChatModal";

type AppProp = {
  show: boolean;
  setVisibility: any;
};

const ChatModal = ({ show, setVisibility }: AppProp) => {
  const context = useAppContext();
  const [Placeholder] = usePictures();
  const scrollViewMessageRef = useRef(null);
  const [scrollTrick, setScrollTrick] = useState(false);

  const UserImage = context.ActiveChatOtherUser?.ProfilePicture
    ? context.ActiveChatOtherUser?.ProfilePicture
    : Placeholder;

  const modalStyle = {
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  };

  useEffect(() => {
    if (!scrollViewMessageRef) {
      return;
    }
    if (!scrollTrick && show) {
      scrollViewMessageRef.current.scrollToEnd();
      setScrollTrick(true);
    }
  }, [scrollViewMessageRef, context.activeChatData]);

  return (
    <Modal
      visible={show}
      onRequestClose={() => setVisibility(false)}
      animationType="slide"
    >
      <ScreenContainer style={modalStyle}>
        <ScreenContainer>
          <View style={styles.modalContainer}>
            <View style={styles.CurrentChatName}>
              <Image source={{ uri: UserImage }} style={[styles.UserImage]} />
              <Text style={styles.UserName}>
                {context.ActiveChatOtherUser?.NickName}
              </Text>
            </View>
            {context.activeChatData && (
              <ScrollView
                style={styles.MessagesContent}
                ref={scrollViewMessageRef}
                scrollsToTop={false}
              >
                {context.activeChatData.map((data) => (
                  <IndividualMessage key={data.id} data={data} />
                ))}
              </ScrollView>
            )}
            {/* <VirtualizedList
              data={context.activeChatData}
              keyExtractor={(item) => item.id}
              renderItem={(item) => <IndividualMessage data={item} />}
              getItem={() => 50}
              getItemCount={(data, index) => ({ name: data.id })}
            /> */}
            <MsgSendForChatModal
              scrollRef={scrollViewMessageRef}
              scrollTrick={setScrollTrick}
            />
          </View>
        </ScreenContainer>
      </ScreenContainer>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    // flexGrow: 2,
    // backgroundColor: "red",
  },
  CurrentChatName: {
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    alignItems: "center",
    backgroundColor: tertiary,
    paddingVertical: 5,
  },
  UserImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 3,
  },

  UserName: {
    fontSize: 30,
    color: Secondary,
  },

  MessagesContent: {
    // marginBottom: 80,
  },
});

export default ChatModal;
