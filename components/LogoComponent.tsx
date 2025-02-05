import { StyleSheet, View, Text, Dimensions } from "react-native"

const styles = StyleSheet.create({
    loadContainer: {
        width: 250,
        height: 100,
        alignItems: 'center',
    },
    loadTitle: {
        paddingBottom: 10,
        fontWeight: '900',
        color: '#a0b9fe',
        fontSize: 50,
        fontFamily: 'FZLanTingHeiS-B-GB", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    loadDes: {

    }
})

export const LogoComponent: React.FC = () => {
    return (
        <View style={styles.loadContainer}>
            <Text style={styles.loadTitle}>小蓝书</Text>
            <Text style={styles.loadDes}>
                你{"   "}的{"   "}生{"   "}活{"   "}指{"   "}南
            </Text>
        </View>
    )
}