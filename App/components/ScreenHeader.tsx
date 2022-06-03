import React from "react"
import { View,StyleSheet,Text } from "react-native"

const ScreenContainer: React.FC = (props)=>{
return <View style={styles.container}>
    <Text>Chats</Text>
    {props.children}
</View>
}

const styles = StyleSheet.create({
    container: {
        height: "10"
    }
})

export default ScreenContainer;