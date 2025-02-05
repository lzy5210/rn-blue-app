import ReadNoticeComponent from '@/components/ReadNoticeComponent';
import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Alert, Keyboard, TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
import PhoneContainerComponent from '@/components/Login/PhoneContainerComponent';
import HeaderComponent from '@/components/Login/HeaderComponent';
import LoginHomeCompnent from '@/components/Login/LoginHomeCompnent';
import OtherLoginComponent from '@/components/Login/OtherLoginComponent';
import { GetPhoneCode, PostLoginUser } from '@/api/auth/login'
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobleContext } from '@/store/globleProvider';

export default function LoginPhoneScreen() {
    const [isActive, setIsActive] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [codeNumber, setCodeNumber] = useState('');
    const [passWord, setPassWord] = useState('');
    const [loginMethod, setLoginMethod] = useState<{
        loginStatus: string,
        leftDes: string,
        rightDes: string,
        buttonDes: string
    }>({
        loginStatus: '5',
        leftDes: '密码登录',
        rightDes: '手机号无法使用',
        buttonDes: '验证并且登录'
    })
    //切换登录方式
    const swicthLogin = (loginStatus: string) => {
        if (loginStatus === '5') {
            setLoginMethod({
                loginStatus: '0',
                leftDes: '验证码登录',
                rightDes: '忘记密码',
                buttonDes: '登录'
            })
        }
        if (loginStatus === '0') {
            setLoginMethod({
                loginStatus: '5',
                leftDes: '密码登录',
                rightDes: '手机号无法使用',
                buttonDes: '验证并且登录'
            })
        }
    }
    // 手机号格式校验
    const validatePhoneNumber = (phone: string) => {
        if (!phone) {
            Alert.alert('手机号不能为空');
            return false;

        }
        if (phone.length < 11) {
            Alert.alert('手机号格式错误');
            return false;
        }
        return true;
    };

    //登录
    const handleLoginForm = async (LoginStats: number) => {
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
        if (!(LoginStats == 0 || LoginStats == 5)) {
            Alert.alert('暂未开放')
            return
        }
        let loginFormData: API.System.LoginUser = {
            loginMethod: undefined,
            phoneNumber: undefined,
            code: undefined,
            userName: undefined,
            passWord: undefined
        }
        //验证码登录
        if (LoginStats == 5) {
            if (!validatePhoneNumber(phoneNumber)) {
                return
            }
            if (codeNumber == '') {
                Alert.alert('验证码不能为空')
                return
            }
            loginFormData.loginMethod = "1"
            loginFormData.phoneNumber = phoneNumber
            loginFormData.code = codeNumber
        }
        //密码登录
        if (LoginStats == 0) {
            if (!validatePhoneNumber(phoneNumber)) {
                return
            }
            if (passWord == '') {
                Alert.alert('密码不能为空')
                return
            }
            loginFormData.loginMethod = "0"
            loginFormData.userName = phoneNumber
            loginFormData.passWord = passWord
        }
        try {
            const res: any = await PostLoginUser(loginFormData);
            const { code, msg } = res
            if (code == '200') {
                const { data: { token, userInfo } } = res
                if (token) {
                    await AsyncStorage.setItem('token', token.tokenValue);
                    await AsyncStorage.setItem('loginId', userInfo.id);
                }
                Alert.alert('登录成功')
                setTimeout(() => {
                    // 登录成功后的逻辑
                    router.replace('/(tabs)')
                }, 1500);
            } else {
                throw new Error(msg);
            }
        } catch (err: any) {
            // 这里捕获错误并通过Alert显示
            Alert.alert('错误', err.message || '发生未知错误');
        }
    }
    // 返回上一页
    const goBack = () => router.back();

    //发送验证码逻辑
    const sendCode = () => {
        return new Promise(async (resolve, reject) => {
            if (validatePhoneNumber(phoneNumber)) {
                try {
                    const { code, data }: any = await GetPhoneCode(phoneNumber)
                    if (code == '200') {
                        // 模拟复制验证码到剪贴板
                        Clipboard.setString(data); // 复制验证码到剪贴板
                        resolve("success")
                        // 显示提示
                        Alert.alert('短信发送成功', `验证码已复制: ${data}`);
                    } else {
                        reject("短信发送失败")
                    }
                    return
                } catch (err: any) {
                    Alert.alert(err)
                }
            }
        })

    }
    return (
        <SafeAreaView style={styles.loginPhoneContainer}>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
                <HeaderComponent goBack={goBack} />
                <PhoneContainerComponent
                    passWord={passWord}
                    phoneNumber={phoneNumber}
                    codeNumber={codeNumber}
                    swicthLogin={swicthLogin}
                    loginMethod={loginMethod}
                    handleChangeCode={(code: string) => setCodeNumber(code)}
                    handleChangePhone={(phone: string) => setPhoneNumber(phone)}
                    handleChangePass={(pass: string) => setPassWord(pass)}
                    sendCode={sendCode} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <LoginHomeCompnent loginMethod={loginMethod} loginForm={handleLoginForm} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <ReadNoticeComponent isActive={isActive} handleEventActive={(isActive: boolean) => setIsActive(isActive)} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <OtherLoginComponent loginForm={handleLoginForm} />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    loginPhoneContainer: {
        flex: 1,
        margin: 10
    },
})

