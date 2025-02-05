import { TouchableOpacity, View, Text, Image, StyleSheet, Alert } from "react-native"


const HeaderComponent: React.FC<{
    goBack: () => void
}> = ({ goBack }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={goBack}>
                <Image resizeMode='contain' style={styles.headerLeft} source={require('@/assets/back.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('需要帮助吗?')}>
                <Text style={styles.headerRight}>帮助</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerLeft: {
        width: 20,
        height: 20
    },
    headerRight: {

    },
})

export default HeaderComponent