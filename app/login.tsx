import React, { useEffect, useState } from 'react'
import { StyleSheet, Modal, Image, View, Text, Dimensions, TouchableOpacity, SafeAreaView, TouchableHighlight, Alert } from "react-native"

import { router } from 'expo-router';
import { LogoComponent } from '@/components/LogoComponent';
import ReadNoticeComponent from '@/components/ReadNoticeComponent';
const styles = StyleSheet.create({
    loginContainer: {
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    topContainer: {
        height: Dimensions.get('window').height / 2 + 80,
    },
    logoContainer: {
        width: Dimensions.get('window').width,
        marginTop: 70,
        marginBottom: 70,
        alignItems: 'center'
    },
    topHelp: {
        paddingRight: 15,
        flexDirection: 'row-reverse'
    },
    helpText: {
        color: '#8a8a8a'
    },
    bottomContainer: {
        height: Dimensions.get('window').height / 2 - 80,
        alignItems: 'center'
    },
    commonLogin: {
        width: Dimensions.get('window').width - 100,
        height: 50,
        borderRadius: 30
    },
    oneLogin: {
        backgroundColor: '#a0b9fe'
    },
    weixinLogin: {
        marginTop: 20,
        backgroundColor: 'rgb(240,240,240)',
        alignItems: 'center'
    },
    otherLogin: {

    },
    weixinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    weixinLogo: {
        marginRight: 5,
        width: 20,
        height: 20
    },
    otherContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredView: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // 半透明背景
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0
    },
    chooseLoginName: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: 'rgb(240,240,240)',
        borderBottomWidth: 0.3,
        justifyContent: 'flex-end'
    },
    loginList: {
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 50,
        marginRight: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loginItem: {
        padding: 5,
        borderRadius: 50,
        borderColor: 'rgb(240,240,240)',
        borderWidth: 0.5
    },
    noticeContainer: {

    }
})

enum LoginStats {
    PassLogin = 0,     //密码登录
    WeChatLogin = 1,   // 微信登录
    QQLogin = 2,       // QQ 登录
    DingTalkLogin = 3, // 钉钉登录
    WeiboLogin = 4,    // 微博登
    OneClickLogin = 5, // 手机号登录
}
export default function LoginScreen() {
    const [isOpenOtherLogin, setIsOpenOtherLogin] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [loginChooseList] = useState<Array<any>>(() => {
        return [
            {
                id: 1,
                name: 'qq',
                icon: require('@/assets/social/qq.png'),
                loginStatus: LoginStats.QQLogin
            }, {
                id: 2,
                name: 'dd',
                icon: require('@/assets/social/dd.png'),
                loginStatus: LoginStats.DingTalkLogin
            }, {
                id: 3,
                name: 'wb',
                icon: require('@/assets/social/wb.png'),
                loginStatus: LoginStats.WeiboLogin
            }, {
                id: 4,
                name: 'wx',
                icon: require('@/assets/social/wx.png'),
                loginStatus: LoginStats.WeChatLogin
            }
        ]
    })
    /**
     * 
     * @param loginStatus 登录方法
     */
    const loginGoHome = (loginStatus: LoginStats) => {
        if (!isActive) {
            Alert.alert(
                '提示', // 标题
                '请阅读并同意以下条款', // 内容
                [
                    { text: '取消', onPress: () => console.log('取消') },
                    {
                        text: '确认', onPress: () => setIsActive(true)
                    },
                ],
                { cancelable: false } // 是否允许点击外部关闭
            );
            return
        }
        if (loginStatus === LoginStats.OneClickLogin && isActive) {
            router.navigate('/loginphone');
        } else {
            Alert.alert('暂未开放')
        }
    }

    return (
        <SafeAreaView style={styles.loginContainer}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.topHelp} onPress={() => Alert.alert('需要帮助吗?')}>
                    <Text style={styles.helpText}>帮助</Text>
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <LogoComponent />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={[styles.commonLogin, styles.oneLogin]}
                    onPress={() => loginGoHome(LoginStats.OneClickLogin)}
                >
                    <Text style={{ textAlign: 'center', lineHeight: 50, color: '#fff', fontWeight: '600' }}>手机号登录</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.commonLogin, styles.weixinLogin]}
                    onPress={() => loginGoHome(LoginStats.WeChatLogin)}
                >
                    <View style={styles.weixinContainer}>
                        <Image source={require('@/assets/weixin.png')} style={styles.weixinLogo} />
                        <Text style={{ textAlign: 'center', lineHeight: 50, color: '#8a8a8a', fontWeight: '600' }}>微信登录</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.otherLogin}
                    onPress={() => {

                    }}
                >
                    <TouchableOpacity style={styles.otherContainer} onPress={() => setIsOpenOtherLogin(!isOpenOtherLogin)}>
                        <Text style={{ textAlign: 'center', color: '#a0b9fe', fontWeight: '600' }}>{`其他方式登录`}</Text>
                        <Image source={require('@/assets/right.png')} style={{ width: 10, height: 10 }} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <View style={{ marginTop: 50 }}>
                    <ReadNoticeComponent isActive={isActive} handleEventActive={(isActive: boolean) => setIsActive(isActive)} />
                </View>

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpenOtherLogin}
                onRequestClose={() => {
                    setIsOpenOtherLogin(!isOpenOtherLogin)
                }}
            >
                <TouchableOpacity style={styles.centeredView}
                    onPress={() => setIsOpenOtherLogin(false)}>
                    <View style={styles.modalView}>
                        {/* 防止点击内容区域时关闭 Modal */}
                        <View style={styles.modalView} onStartShouldSetResponder={() => true}>
                            <View style={styles.chooseLoginName}>
                                <Text style={{ marginRight: 120, fontWeight: '600' }}>选择登录方式</Text>
                                <TouchableOpacity onPress={() => setIsOpenOtherLogin(false)}>
                                    <Image source={require('@/assets/x.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.loginList}>
                                {
                                    loginChooseList.map((item: any) => (
                                        <TouchableOpacity style={styles.loginItem} key={item.id} onPress={() => loginGoHome(item.loginStatus)}>
                                            <Image source={item.icon} style={{ width: 30, height: 30 }} />
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            <ReadNoticeComponent isActive={isActive} handleEventActive={(isActive: boolean) => setIsActive(isActive)} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    )
}