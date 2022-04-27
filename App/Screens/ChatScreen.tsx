import React from "react"
import { View,Text,StyleSheet } from "react-native"
import ScreenContainer from "../components/ScreenContainer"
import ScreenHeader from "../components/ScreenHeader"


const ChatScreen = () => {
    return <ScreenContainer>
    <View style={styles.container}> 
        <Text>ChatRoom</Text>
        </View>
         </ScreenContainer>
}
export default ChatScreen


const styles= StyleSheet.create({
    container: {
        
    }
})