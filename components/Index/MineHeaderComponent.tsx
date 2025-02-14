import { useState } from "react"
import { View, Image, Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native"
import UnfoldComponent from "@/components/Unfold/UnfoldComponent"
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const itemList = [{
    id: 1,
    name: '关注'
}, {
    id: 2,
    name: '发现'
}, {
    id: 3,
    name: '附近'
}]

const MineHeaderComponent = () => {
    const [isActive, setIsActive] = useState(2)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const handleUnfoldClose = (isShow: boolean) => {
        setDrawerOpen(isShow)
    }
    return (
        <View style={styles.mineHeader}>
            <TouchableOpacity style={styles.leftLogo} onPress={() => setDrawerOpen(true)}>
                <Image source={require('@/assets/index/unfold.png')} style={styles.commonImg} />
            </TouchableOpacity>
            <View style={styles.centerDes}>
                {
                    itemList.map((item: any) => (
                        <TouchableOpacity style={[styles.borderSty,
                        isActive === item.id && styles.activeBorder
                        ]} onPress={() => setIsActive(item.id)} key={item.id}>
                            <Text style={{ color: '#1a1a1a', fontWeight: '500', fontSize: 16, textAlign: 'center' }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <TouchableOpacity style={styles.rightLogo}>
                <View style={styles.leftLogo2}>
                    <Image source={require('@/assets/index/search-data.png')} style={styles.commonImg} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mineContainer: {
        flex: 1
    },
    mineHeader: {
        paddingTop: 60,
        paddingLeft: 20,
        paddingRight: 20,
        width: Dimensions.get('window').width,
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 0.2,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 150
    },
    borderSty: {
        width: 35,
        height: 25
    },
    activeBorder: {
        borderBottomColor: '#a0b9fe',
        borderBottomWidth: 2
    },
    leftLogo1: {
        marginRight: 15
    },
    leftLogo2: {

    }
});

export default MineHeaderComponent;