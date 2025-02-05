import { useEffect, useState } from "react"
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert } from "react-native"

const ReadNoticeComponent: React.FC<{
    handleEventActive: (isActive: boolean) => void
    isActive: boolean
}> = ({
    handleEventActive,
    isActive
}) => {
        const [activeColor, setActiveColor] = useState('#fff')
        useEffect(() => {
            if (isActive) {
                setActiveColor('#a0b9fe')
            } else {
                setActiveColor('#fff')
            }
        }, [isActive])
        const styles = StyleSheet.create({
            noticeContainer: {
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: 6,
                marginLeft: 40,
                marginRight: 40,
                borderRadius: 5
            },
            image: {
                width: 10,
                height: 10,
            },
            noticeText: {
                fontWeight: '600',
                fontSize: 12,
                color: '#333',
            },
            linkText: {
                fontWeight: '600',
                color: '#a0b9fe'
            },
            lastLink: {
                marginTop: 10
            },
            activeLogo: {
                backgroundColor: activeColor,
                width: 15,
                height: 15,
                borderRadius: 50,
                borderColor: 'rgb(240,240,240)',
                borderWidth: 0.5,
                marginRight: 5,
                justifyContent: 'center',
                alignItems: 'center'
            }
        });
        return (
            <TouchableOpacity onPress={() => Alert.alert('好的,知道你阅读了~')}>
                <View style={styles.noticeContainer}>
                    <TouchableOpacity style={styles.activeLogo} onPress={(e) => {
                        e.stopPropagation(); // 阻止事件冒泡
                        handleEventActive(!isActive);
                    }}>
                        {
                            isActive && <Image
                                source={require('@/assets/active.png')} // 替换为你的图片路径
                                style={styles.image}
                            />
                        }
                    </TouchableOpacity>
                    <Text style={styles.noticeText}>
                        我已阅读并同意
                        <Text style={styles.linkText}>{`《用户协议》`}</Text>
                        <Text style={styles.linkText}>{`《隐私政策》`}</Text>
                        <Text style={styles.linkText}>{`《未成年人`}</Text>
                    </Text>
                </View>
                <View style={{ marginLeft: 66, marginBottom: 100 }}>
                    <Text style={[styles.linkText, { fontSize: 12 }]}>{`个人信息保护法则》`}</Text>
                </View>
            </TouchableOpacity>

        )
    }

export default ReadNoticeComponent;