import { useEffect } from "react"
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native"

const LoginHomeCompnent: React.FC<{
    loginForm: (LoginStats: number) => void,
    loginMethod: any
}> = ({
    loginForm,
    loginMethod
}) => {
        return (
            <TouchableOpacity
                style={styles.commonLogin}
                onPress={() => loginForm(loginMethod.loginStatus)}
            >
                <Text style={{ textAlign: 'center', lineHeight: 40, color: '#fff', fontWeight: '600' }}>{loginMethod.buttonDes}</Text>
            </TouchableOpacity>
        )
    }
const styles = StyleSheet.create({
    commonLogin: {
        marginTop: 20,
        width: Dimensions.get('window').width - 120,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#a0b9fe'
    },
})

export default LoginHomeCompnent