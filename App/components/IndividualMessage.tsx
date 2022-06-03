import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Primary } from "../Global/Colors";
import { useAppContext } from "../Global/Context";
import usePictures from "../Hooks/usePictures";

const IndividualMessage = ({ data }) => {
  const context = useAppContext();
  const [Placeholder] = usePictures();

  const styles = StyleSheet.create({
    MsgDiv: {
      flexDirection:
        context.Current_UserID === data.Sender ? "row-reverse" : "row",
      alignItems: "center",
      marginVertical: 15,
    },
    UserImage: {
      width: 60,
      height: 60,
      borderRadius: 50,
      borderWidth: 3,
    },
    UserImageModal: {
      marginVertical: 10,
    },
    MsgText: {
      marginHorizontal: 5,
      fontSize: 18,
      maxWidth: 300,
      borderRadius: 30,
      borderColor: Primary,
      borderWidth: 5,
      backgroundColor: Primary,
      color: "black",
      paddingHorizontal: 15,
      paddingTop: 10,
      paddingBottom: 0,
    },
  });

  const UserPicObtain =
    context?.allUsersData &&
    context?.allUsersData?.find?.((content) => content.User_ID === data.Sender)
      ?.ProfilePicture;

  const UserPic = UserPicObtain ? UserPicObtain : Placeholder;

  return (
    <View style={styles.MsgDiv}>
      <Image
        source={{
          uri: UserPic,
        }}
        style={[styles.UserImage, styles.UserImageModal]}
      />
      <Text style={styles.MsgText}>
        {data.Message === "Gif" ? "Giffs not supported yet" : data.text}
      </Text>
    </View>
  );
};

export default IndividualMessage;
