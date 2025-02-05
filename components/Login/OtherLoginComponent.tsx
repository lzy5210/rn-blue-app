import { View, StyleSheet, TouchableOpacity, Image } from "react-native"

const OtherLoginComponent: React.FC<{
    loginForm: (LoginStats: number) => void,
}> = ({
    loginForm
}) => {
        const LoginAllLogos = [{
            LoginStats: 1,
            LoginImg: require('@/assets/login/weixin.png')
        }, {
            LoginStats: 4,
            LoginImg: require('@/assets/login/weibo.png')
        }, {
            LoginStats: 9,
            LoginImg: require('@/assets/login/qq.png')
        }, {
            LoginStats: 9,
            LoginImg: require('@/assets/login/youjian.png')
        }]
        return (
            <View style={styles.otherContainer}>
                {
                    LoginAllLogos.map((item: any, index: number) => (
                        <TouchableOpacity key={index} onPress={() => loginForm(item.LoginStats)}>
                            <Image source={item.LoginImg} style={styles.otherImg} resizeMode='contain'
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

const styles = StyleSheet.create({
    otherContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    otherImg: {
        width: 40,
        height: 40
    }
})
export default OtherLoginComponent