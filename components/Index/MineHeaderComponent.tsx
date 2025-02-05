import { View, Image, Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native"

const MineHeaderComponent = () => {
    return (
        <View style={styles.mineHeader}>
            <View style={styles.leftLogo}>
                <Image source={require('@/assets/index/unfold.png')} style={styles.commonImg} />
            </View>
            <TouchableOpacity style={styles.centerDes}>
                <Text style={{ color: '#1a1a1a', fontWeight: '500', fontSize: 16 }}>关注</Text>
                <Text style={{ color: '#1a1a1a', fontWeight: '500', fontSize: 16, marginLeft: 15, marginRight: 15 }}>发现</Text>
                <Text style={{ color: '#1a1a1a', fontWeight: '500', fontSize: 16 }}>附近</Text>
            </TouchableOpacity>
            <View style={styles.rightLogo}>
                <View style={styles.leftLogo2}>
                    <Image source={require('@/assets/index/search-data.png')} style={styles.commonImg} />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mineContainer: {
        flex: 1,
    },
    mineHeader: {
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        width: Dimensions.get('window').width,
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    commonImg: {
        width: 25,
        height: 25
    },
    leftLogo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightLogo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    centerDes: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftLogo1: {
        marginRight: 15
    },
    leftLogo2: {

    }
});

export default MineHeaderComponent