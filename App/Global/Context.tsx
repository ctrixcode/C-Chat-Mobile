import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, db } from "../Firebase/Firebase-config";
import { contextProps, Message, userDataStructure } from "../Typescript/types";

const appContext = createContext<contextProps | null>(null);

export const ContextWrapper = ({ children }) => {
  // Current User Data
  const [Current_UserID, setCurrent_UserID] = useState("");
  const [Current_UserName, setCurrent_UserName] = useState("");
  const [Current_UserData, setCurrent_UserData] = useState([]);

  // All User Data
  const [allUsersData, setallUserData] = useState([]);

  // Chats Related to Current User
  const [userChats, setuserChats] = useState(null);

  // For Mobile open Chat or Panel
  const [openChat, setopenChat] = useState(false);

  // Current Active Chat
  const [activeChat, setactiveChat] = useState(null);

  // Current Acive chat 2nd User
  const [ActiveChatOtherUser, setActiveChatOtherUser] =
    useState<userDataStructure | null>();

  // Add button clicked in side bar
  const [newPersonaddbtn, setnewPersonaddbtn] = useState(false);

  // Group Chat User List
  const [groupChatList, setgroupChatList] = useState([]);

  // Sidebar Header Options display
  const [sideBarOptions, setsideBarOptions] = useState(false);

  // User Data Except Current User
  const [UsersData, setUsersData] = useState({});

  // Private Chat Inits
  const [privateChatInit, setprivateChatInit] = useState([]);

  //  Display User Settings

  const [DisplayUserSettings, setDisplayUserSettings] =
    useState<boolean>(false);

  // App Loading
  const [Loading, setLoading] = useState<boolean>(true);

  // Active Chat Data
  const [activeChatData, setactiveChatData] = useState();

  // Giff Div Show
  const [showGifDiv, setshowGifDiv] = useState(false);

  // If User is sign in or not
  const [isUserSignIn, setIsUserSignIn] = useState(false);

  // Collection and Document Reference
  const allUsersData_Ref = collection(db, "User_Data");

  const [allUsersData_fetch, loading, error] =
    useCollectionData(allUsersData_Ref);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (Current_UserID === "") {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          setCurrent_UserID(user.uid);
        } else {
          return;
        }
      });
    }
    // Retrieve data and set States
    if (!loading) {
      const CurrentUserData = allUsersData_fetch.filter(
        (user) => user.User_ID === Current_UserID
      );
      const allUserDataExceptCurrentUser = allUsersData_fetch.filter(
        (user) => user.User_ID !== Current_UserID
      );
      // All users data
      setallUserData(allUsersData_fetch);
      // User Data Except current user
      setUsersData(allUserDataExceptCurrentUser);
      // Current logged in user data
      if (CurrentUserData[0]) {
        setCurrent_UserName(CurrentUserData[0].NickName);
        setCurrent_UserData(CurrentUserData);
      }
    }

    // eslint-disable-next-line
  }, [loading, error, Current_UserID, auth]);

  //
  //
  // Retrieving Private Chats and Public Chat for Current User
  //
  //

  useEffect(() => {
    if (Current_UserID === "") {
      return;
    }

    // Ref
    const PMREF = collection(db, "Private_Chat_init");

    // Retrieving Private Chatroom details related to current user

    onSnapshot(
      query(PMREF, where("User1.ID", "==", Current_UserID)),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          //  Filter Older Version of Chat
          setprivateChatInit((chat) =>
            chat.filter((arr) => arr.ChatID !== data.ChatID)
          );
          setprivateChatInit((value) => [...value, data]);
        });
      }
    );
    onSnapshot(
      query(PMREF, where("User2.ID", "==", Current_UserID)),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          setprivateChatInit((chat) =>
            chat.filter((arr) => arr.ChatID !== data.ChatID)
          );
          setprivateChatInit((value) => [...value, data]);
        });
      }
    );

    // Group Chat

    const GroupChatRef = collection(db, "Group_Chat_init");

    onSnapshot(
      query(
        GroupChatRef,
        where("ChatUserID", "array-contains", Current_UserID)
      ),
      (snapshot) => {
        setLoading(false);
        snapshot.docs.forEach((doc) => {
          const data = doc.data();

          setprivateChatInit((chat) =>
            chat.filter((arr) => arr.ChatID !== data.ChatID)
          );
          setprivateChatInit((value) => [...value, data]);
        });
      }
    );

    // eslint-disable-next-line
  }, [db, Current_UserID, auth]);

  return (
    <appContext.Provider
      value={{
        // Current User Data
        Current_UserID,
        setCurrent_UserID,

        Current_UserName,
        setCurrent_UserName,

        Current_UserData,
        setCurrent_UserData,

        activeChat,
        setactiveChat,

        ActiveChatOtherUser,
        setActiveChatOtherUser,

        userChats,
        setuserChats,

        UsersData,
        setUsersData,

        allUsersData,
        setallUserData,

        openChat,
        setopenChat,

        sideBarOptions,
        setsideBarOptions,

        newPersonaddbtn,
        setnewPersonaddbtn,

        privateChatInit,
        setprivateChatInit,

        groupChatList,
        setgroupChatList,

        DisplayUserSettings,
        setDisplayUserSettings,

        Loading,
        setLoading,

        activeChatData,
        setactiveChatData,

        showGifDiv,
        setshowGifDiv,

        isUserSignIn,
        setIsUserSignIn,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
