import { View,StyleSheet } from "react-native"
import { Primary } from "../Global/Colors"

const ScreenContainer: React.FC = (props)=> {
    return <View style={styles.container}>
  {props.children}
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Primary,
        flex: 1,
        borderTopEndRadius: 70,
        borderTopLeftRadius: 70,
        paddingTop: 25,
        paddingHorizontal: 25
        
    }
})

export default ScreenContainer
