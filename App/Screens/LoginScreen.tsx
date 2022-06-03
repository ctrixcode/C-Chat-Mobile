import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { Primary, tertiary, Secondary } from "../Global/Colors";
import { StatusBar } from "expo-status-bar";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "../Firebase/Firebase-config";
import { useAppContext } from "../Global/Context";

const LoginScreen = () => {
  // Hooks
  const context = useAppContext();

  // States
  const [registerBtnPressed, setRegisterBtnPressed] = useState(false);
  const [loggingInProgress, setLoggingInProgress] = useState(false);

  // Form Data
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error Logs
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(true);

  // Funtions

  const emailValidationHandler = () => {
    setPasswordValid(true);
    email.slice() === "" ? setEmailValid(false) : setEmailValid(true);
  };

  const ConfirmPasswordHandler = () => {
    setPasswordValid(true);
    password === confirmPassword
      ? setConfirmPasswordMatch(true)
      : setConfirmPasswordMatch(false);
  };

  const signInWithEmailPasswordHandler = () => {
    if (emailValid && passwordValid && email && password) {
      setLoggingInProgress(true);
      signInWithEmailAndPassword(auth, email.trim(), password)
        .then((data) => {
          setLoggingInProgress(false);
          context.setIsUserSignIn(true);
        })
        .catch(() => {
          setPasswordValid(false);
          setLoggingInProgress(false);
        });
    }
  };

  const signUpHandler = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordMatch(false);
      return;
    }
    setConfirmPasswordMatch(true);

    createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogleHanlder = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((cred) => {
        console.log("Log in successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Styles

  const normalBtnStyles = ({ pressed }) => [
    { opacity: pressed ? 0.7 : 1 },
    styles.Button,
  ];

  const GoogleBtnStyles = ({ pressed }) => [
    { opacity: pressed ? 0.7 : 1 },
    styles.Button,
    styles.signInwithGoogle,
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <Text style={styles.welcomeHeading}>Welcome to Ctrix Chats</Text>

      <Text style={[styles.welcomeHeading, styles.pageNameHeading]}>
        {registerBtnPressed ? "Register" : "Login"}
      </Text>

      <TextInput
        placeholder="E-mail"
        style={styles.InputStyles}
        value={email}
        onChangeText={setemail}
        autoCompleteType="email"
        maxLength={25}
        onChange={emailValidationHandler}
      />
      {!emailValid && <Text style={styles.errMsg}>email is Invalid</Text>}
      <TextInput
        placeholder="Password"
        style={styles.InputStyles}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {!passwordValid && (
        <Text style={styles.errMsg}>Password or email is Incorrect</Text>
      )}
      {registerBtnPressed && (
        <TextInput
          placeholder="Confirm Password"
          style={styles.InputStyles}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          onChange={ConfirmPasswordHandler}
        />
      )}
      {/* <Pressable onPress={(onpress)=>}></Pressable> */}
      {registerBtnPressed && !confirmPasswordMatch && (
        <Text style={styles.errMsg}>Password doesn't match</Text>
      )}
      <View style={styles.ButtonDiv}>
        <View style={styles.Horizontalbtndiv}>
          {loggingInProgress && (
            <ActivityIndicator size="large" color={Primary} />
          )}
          <Pressable
            style={normalBtnStyles}
            onPress={
              registerBtnPressed
                ? signUpHandler
                : signInWithEmailPasswordHandler
            }
          >
            <Text style={styles.signInButtonText}>
              {registerBtnPressed ? "Register" : "Login"}
            </Text>
          </Pressable>
          {!registerBtnPressed && (
            <Pressable
              style={normalBtnStyles}
              onPress={() => {
                setPasswordValid(true);
                setConfirmPasswordMatch(true);
                setRegisterBtnPressed(true);
              }}
            >
              <Text style={styles.signInButtonText}>Register</Text>
            </Pressable>
          )}
          {registerBtnPressed && (
            <Pressable
              style={normalBtnStyles}
              onPress={() => {
                setRegisterBtnPressed(false);
              }}
            >
              <Text style={styles.signInButtonText}>Cancel</Text>
            </Pressable>
          )}
        </View>
        <Pressable style={GoogleBtnStyles} onPress={signInWithGoogleHanlder}>
          <Text style={styles.signInButtonText}>Sign In with Google</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  welcomeHeading: {
    color: Primary,
    fontSize: 25,
    textAlign: "center",
    marginTop: 10,
  },
  pageNameHeading: {
    marginVertical: 20,
  },
  InputStyles: {
    fontSize: 20,
    marginVertical: 10,
    borderColor: Primary,
    marginHorizontal: 5,
    borderWidth: 1,
    padding: 10,
  },
  ButtonDiv: {
    alignItems: "center",
  },
  Horizontalbtndiv: {
    flexDirection: "row",
  },
  Button: {
    backgroundColor: Primary,
    padding: 10,
    marginVertical: 25,
    marginHorizontal: 5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
  },
  signInButtonText: {
    color: Secondary,
    fontSize: 20,
  },
  signInwithGoogle: {
    alignSelf: "stretch",
    alignItems: "center",
    marginVertical: 10,
  },
  errMsg: {
    fontSize: 20,
    marginLeft: 5,
    color: "red",
  },
});
