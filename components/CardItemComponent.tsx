import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, TouchableOpacity, Alert, Vibration } from "react-native";
import * as MediaLibrary from 'expo-media-library';

export const RenderItemImg = ({ item, currentItem }: any): React.ReactNode => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (currentItem?.id === item.id) {
            console.log('当前滑动的是', item);
            Animated.timing(fadeAnim, {
                toValue: 2,  // 动画到 360 度旋转
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,  // 动画到 360 度旋转
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [currentItem])
    // 处理旋转和缩放
    const rotate = fadeAnim.interpolate({
        inputRange: [0, 2],
        outputRange: ['0deg', '2deg'], // 旋转范围
    });

    const scale = fadeAnim.interpolate({
        inputRange: [0, 2],
        outputRange: [1, 0.9], // 缩放范围
    });
    const handleLongPress = () => {
        if (currentItem?.id === item.id) {
            // 触发震动
            Vibration.vibrate([10]); // 震动 10ms，暂停 50ms，再震动 10ms
            Alert.alert(
                '提示', // 标题
                '是否保存当前图片到本地?', // 内容
                [
                    { text: '取消', onPress: () => console.log('取消') },
                    { text: '确认', onPress: async () => await saveImage(currentItem.img) },
                ],
                { cancelable: false } // 是否允许点击外部关闭
            );
        }
    }
    const saveImage = async (imageUri: any) => {
        try {
            await MediaLibrary.saveToLibraryAsync(imageUri);
            alert('图片已保存到相册！');
        } catch (error) {
            console.error('保存图片到相册失败:', error);
            alert('保存图片到相册失败，请重试！');
        }
    };
    return (
        <TouchableOpacity onLongPress={handleLongPress} delayLongPress={500} activeOpacity={1} style={styles.cardContainer}>
            <Animated.Image
                source={item.img}
                style={[
                    styles.imgSty,
                    {
                        transform: [{ rotate }, { scale }],
                    },
                ]}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgSty: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 200,
        borderRadius: 15,
    },
});