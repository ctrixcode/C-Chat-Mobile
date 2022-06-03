import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useAppContext } from "../Global/Context";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase-config";

export default function DrawerContent() {
  const context = useAppContext();

  const signOutHandler = () => {
    signOut(auth);
    console.log("sign out...");
    context.setCurrent_UserID("");
    context.setCurrent_UserName("");
    context.setCurrent_UserData("");
    context.setUsersData("");
    context.setactiveChat(null);
    context.setprivateChatInit([]);
    context.setIsUserSignIn(false);
    context.setactiveChatData([]);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={signOutHandler}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    color: "red",
    padding: 10,
  },
});
