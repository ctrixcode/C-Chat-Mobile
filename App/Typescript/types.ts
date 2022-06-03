import { SetStateAction } from "react";

export interface Message {
    ChatID: string;
    Sender: string;
    CreatedAt: any;
    id: string;
    text: string
}
export interface ChatInitStructure {
    ChatID: string;
    ChatType: "DM"| "Group";
    ChatUserID: string[];
    User1: {ID: string}
    User2: {ID: string}
}

export interface userDataStructure {
        NickName: string,
        ProfilePicture: string ;
        User_ID: string,
}

export type contextProps = {
    Current_UserID: string;
    setCurrent_UserID: any;
  
    Current_UserName: string;
    setCurrent_UserName: any;
  
    Current_UserData: any[];
    setCurrent_UserData: any;
  
    activeChat;
    setactiveChat: any;
  
    ActiveChatOtherUser: userDataStructure,
    setActiveChatOtherUser,
  
    userChats;
    setuserChats: any;
  
    UsersData;
    setUsersData: any;
  
    allUsersData;
    setallUserData: any;
  
    openChat;
    setopenChat: any;
  
    sideBarOptions;
    setsideBarOptions: any;
  
    newPersonaddbtn;
    setnewPersonaddbtn: any;
  
    privateChatInit;
    setprivateChatInit;
  
    groupChatList;
    setgroupChatList: any;
  
    DisplayUserSettings;
    setDisplayUserSettings: any;
  
    Loading;
    setLoading: any;
  
    activeChatData;
    setactiveChatData: any;
  
    showGifDiv;
    setshowGifDiv: any;
  
    isUserSignIn;
    setIsUserSignIn;
  };