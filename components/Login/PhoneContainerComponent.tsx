import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from "react-native";

const PhoneContainerComponent: React.FC<{
    loginMethod: any;
    phoneNumber: string;
    codeNumber: string;
    passWord: string;
    swicthLogin: (loginStatus: string) => void;
    handleChangePhone: (phone: string) => void;
    handleChangePass: (pass: string) => void;
    handleChangeCode: (code: string) => void;
    sendCode: () => Promise<any>;
}> = React.memo(({ phoneNumber, passWord, codeNumber, loginMethod,
    swicthLogin, handleChangePhone,
    handleChangePass, handleChangeCode, sendCode }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [timer, setTimer] = useState(60); // 初始倒计时 60 秒
    // 发送验证码
    const handleSendCode = async () => {
        sendCode().then((res) => {
            if (res == 'success') {
                // 启动倒计时
                setIsButtonDisabled(true);
                const interval = setInterval(() => {
                    setTimer((prev) => {
                        if (prev === 1) {
                            clearInterval(interval);
                            setIsButtonDisabled(false); // 倒计时结束，启用按钮
                            return 60; // 重置倒计时
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        }).catch(err => Alert.alert(err))
    };
    return (
        <View style={styles.phoneContainer}>
            <Text style={styles.phoneTitle}>手机号登录</Text>
            <Text style={styles.phoneDes}>未注册的手机号登录成功后将自动注册</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputContent}>
                    <Text style={styles.leftChooseNumber}>+86</Text>
                    <Text style={{ color: '#DCDCDC', fontSize: 18 }}>|</Text>
                    <TextInput
                        style={{ marginLeft: 10, fontSize: 16, fontWeight: '600', width: 200 }}
                        onChangeText={handleChangePhone}
                        value={phoneNumber}
                        placeholder="请输入手机号"
                        placeholderTextColor="#8a8a8a"
                        cursorColor="#a0b9fe"
                        keyboardType="numeric"
                        maxLength={11}
                    />
                </View>
            </View>
            {loginMethod.loginStatus === '0' && (
                <View style={styles.inputPassContainer}>
                    <TextInput
                        style={{ fontSize: 16, fontWeight: '600' }}
                        value={passWord}
                        textContentType="password"
                        keyboardType="default"
                        secureTextEntry={isPasswordVisible}
                        onChangeText={handleChangePass}
                        placeholder="请输入密码"
                        placeholderTextColor="#8a8a8a"
                        cursorColor="#a0b9fe"
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 0 }}>
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={isPasswordVisible ? require('@/assets/login/look.png') : require('@/assets/login/stop.png')}
                        />
                    </TouchableOpacity>
                </View>
            )}
            {loginMethod.loginStatus === '5' && (
                <View style={styles.inputPassContainer}>
                    <TextInput
                        style={{ fontSize: 16, fontWeight: '600', width: 200 }}
                        onChangeText={handleChangeCode}
                        value={codeNumber}
                        placeholder="请输入验证码"
                        placeholderTextColor="#8a8a8a"
                        cursorColor="#a0b9fe"
                        keyboardType="numeric"
                        maxLength={6}
                    />
                    <TouchableOpacity
                        onPress={handleSendCode}
                        style={{ position: 'absolute', right: 0 }}
                        disabled={isButtonDisabled} // 根据倒计时禁用按钮
                    >
                        <Text style={{ color: '#a0b9fe', fontSize: 16 }}>
                            {isButtonDisabled ? `${timer}s 后重新发送` : '获取验证码'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.passContainer}>
                <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={() => swicthLogin(loginMethod.loginStatus)}>
                    <Image style={styles.swichLogo} resizeMode="contain" source={require('@/assets/swich.png')} />
                    <Text style={styles.passText}>{loginMethod.leftDes}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.passText}>{loginMethod.rightDes}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});
const styles = StyleSheet.create({
    phoneContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    phoneTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1a1a1a'
    },
    phoneDes: {
        fontSize: 12,
        color: '#8a8a8a',
        marginTop: 10,
    },
    inputContainer: {
        marginTop: 50,
        width: 260,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 0.2,
    },
    inputContent: {
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftChooseNumber: {
        fontSize: 16,
        fontWeight: '600',
        width: 50
    },
    inputPassContainer: {
        paddingBottom: 10,
        marginTop: 20,
        width: 260,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 0.2,
    },

    passContainer: {
        marginTop: 10,
        width: 260,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    passText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#a0b9fe'
    },
    swichLogo: {
        height: 15,
        width: 15
    }
})
export default PhoneContainerComponent;
