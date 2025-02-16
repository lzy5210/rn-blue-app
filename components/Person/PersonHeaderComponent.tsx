import { useGlobleContext } from '@/store/globleProvider';
import React, { useEffect, useRef } from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet, ImageBackground, Animated } from "react-native"

const PersonHeaderComponent: React.FC = () => {
    const { state, dispatch }: any = useGlobleContext();
    const handleLoadMore = () => {
        console.log('触发更多');

    }
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current; // 用来控制透明度

    useEffect(() => {
        // 控制平移和渐变动画
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: state.isStickyHeader ? 25 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: state.isStickyHeader ? 1 : 0, // 渐变透明度
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [state.isStickyHeader]);

    return (
        <ImageBackground style={styles.headerContainer}
            source={require('@/assets/bizhi/b2.jpg')} blurRadius={45}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={handleLoadMore}>
                    <Image style={{ width: 25, height: 25 }} source={require('@/assets/person/unfold.png')} />
                </TouchableOpacity>
                <View style={styles.rightLogo}>
                    <TouchableOpacity>
                        <Image style={{ width: 25, height: 25 }} source={require('@/assets/person/search-data.png')} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.share}>
                        <Image style={{ width: 25, height: 25 }} source={require('@/assets/person/share.png')} />
                    </TouchableOpacity> */}
                </View>
            </View>
            {
                state.isStickyHeader && (
                    <Animated.Image
                        source={require("@/assets/xiaonan.jpg")}
                        style={[
                            styles.avatar,
                            {
                                transform: [{ translateY: translateY }],
                                opacity: opacity, // 应用渐变效果
                            },
                        ]}
                    />
                )
            }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    avatar: {
        position: 'absolute',
        left: '45%',
        bottom: 0,
        width: 50,
        height: 50,
        borderRadius: 50,
        zIndex: 1000,
        borderWidth: 2,
        borderColor: '#fff',
    },
    headerContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'rgba(85, 85, 85, 0.3)',
        borderBottomWidth: 5,
        //淡灰色
        borderBottomColor: 'rgb(245,245,245)',
    },
    headerContent: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15,
    },
    rightLogo: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    share: {
        marginLeft: 10
    }
})
export default PersonHeaderComponent
