import { Text, Dimensions, View, Image, StyleSheet, Platform, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useState } from 'react';
import { useGlobleContext } from '@/store/globleProvider';
import LoginScreen from '../login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
const HEADER_HEIGHT = 400;
export default function MineScreen() {
    const [isScroll, setIsScroll] = useState(true)

    return (
        <SafeAreaView style={styles.mineContainer}>
            <TouchableOpacity style={{ width: 260, height: 50, backgroundColor: '#ccc', borderRadius: 30, marginTop: '120%' }}
                onPress={async () => {
                    await AsyncStorage.removeItem("token")
                    await AsyncStorage.removeItem('loginId');
                    Alert.alert("退出成功");
                    setTimeout(() => {
                        // 登录成功后的逻辑
                        router.replace("/login")
                    }, 1500);
                }}>
                <Text style={{ textAlign: 'center', lineHeight: 50, color: '#fff', fontSize: 18, fontWeight: '500' }}>
                    退出登录
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    header: {
        height: HEADER_HEIGHT,
    },
    mineContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mineHeader: {
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        width: Dimensions.get('window').width,
        height: 120,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
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
        marginLeft: 50,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        height: 25,
        backgroundColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftLogo1: {
        marginRight: 15
    },
    leftLogo2: {

    }
});