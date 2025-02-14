import { Text, Dimensions, View, Image, StyleSheet, Platform, TouchableOpacity, ScrollView, SafeAreaView, Alert, Animated, ImageBackground } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Ionicons } from '@expo/vector-icons';
import { useGlobleContext } from '@/store/globleProvider';

export default function MineScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const { width } = Dimensions.get('window');
    const [activeTab, setActiveTab] = useState(0);
    const { state, dispatch }: any = useGlobleContext();
    useEffect(() => {
        if (state.isStickyHeader) {
            // Alert.alert('开始吸顶');
            console.log('开始吸顶');
        } else {
            console.log('结束吸顶');
            // Alert.alert('结束吸顶');
        }


    }, [state.isStickyHeader]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    // 计算头部动画值
    const headerHeight = scrollY.interpolate({
        inputRange: [0, 250],
        outputRange: [350, 60],
        extrapolate: 'clamp'
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    const avatarScale = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [1, 0.5],
        extrapolate: 'clamp'
    });

    // 处理滑动切换
    const [startX, setStartX] = useState(0);
    const handleTouchStart = (e: any) => {
        setStartX(e.nativeEvent.pageX);
    };

    const handleTouchEnd = (e: any) => {
        const endX = e.nativeEvent.pageX;
        const diff = endX - startX;

        if (Math.abs(diff) > 50) { // 滑动距离超过50才触发切换
            if (diff > 0 && activeTab > 0) {
                // 右滑，切换到前一个tab
                setActiveTab(activeTab - 1);
            } else if (diff < 0 && activeTab < 1) {
                // 左滑，切换到后一个tab
                setActiveTab(activeTab + 1);
            }
        }
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    <ImageBackground
                        source={{ uri: 'https://picsum.photos/800/600' }}
                        style={styles.headerBackground}
                    >
                        <View style={styles.headerOverlay}>
                            <Animated.Image
                                source={require("@/assets/avatar.jpg")}
                                style={[styles.avatar, { transform: [{ scale: avatarScale }] }]}
                            />
                            <Animated.View style={{ opacity: headerOpacity, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.nickname, { color: '#fff' }]}>小红书用户</Text>
                                <Text style={[styles.redId, { color: '#ddd' }]}>小红书号: RED123456</Text>

                                <View style={styles.statsContainer}>
                                    <View style={styles.statItem}>
                                        <Text style={[styles.statNumber, { color: '#fff' }]}>128</Text>
                                        <Text style={[styles.statLabel, { color: '#ddd' }]}>关注</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={[styles.statNumber, { color: '#fff' }]}>3.2k</Text>
                                        <Text style={[styles.statLabel, { color: '#ddd' }]}>粉丝</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={[styles.statNumber, { color: '#fff' }]}>892</Text>
                                        <Text style={[styles.statLabel, { color: '#ddd' }]}>获赞与收藏</Text>
                                    </View>
                                </View>

                                <Text style={[styles.bio, { color: '#fff' }]}>这是一段个性签名，让生活更有趣~</Text>
                            </Animated.View>
                        </View>
                    </ImageBackground>
                </Animated.View>
            }>
            {/* 内容区域 */}
            <View
                style={styles.content}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* 笔记网格 */}
                {activeTab === 0 && (
                    <View style={styles.grid}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
                            <TouchableOpacity key={item} style={styles.gridItem}>
                                <Image
                                    source={{ uri: `https://picsum.photos/200/300?random=${item}` }}
                                    style={styles.gridImage}
                                />
                                <Text numberOfLines={2} style={styles.gridTitle}>
                                    这是一个很长的笔记标题示例，可能会显示两行文字
                                </Text>
                                <View style={styles.gridStats}>
                                    <Text style={styles.gridStatsText}>{Math.floor(Math.random() * 1000)}赞</Text>
                                    <Text style={styles.gridStatsText}>{Math.floor(Math.random() * 100)}评论</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* 收藏内容 */}
                {activeTab === 1 && (
                    <View style={styles.grid}>
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <TouchableOpacity key={item} style={styles.gridItem}>
                                <Image
                                    source={{ uri: `https://picsum.photos/200/300?random=${item + 100}` }}
                                    style={styles.gridImage}
                                />
                                <Text numberOfLines={2} style={styles.gridTitle}>
                                    这是收藏的内容标题
                                </Text>
                                <View style={styles.gridStats}>
                                    <Text style={styles.gridStatsText}>{Math.floor(Math.random() * 1000)}赞</Text>
                                    <Text style={styles.gridStatsText}>{Math.floor(Math.random() * 100)}评论</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        position: 'relative',
        overflow: 'hidden',
    },
    headerBackground: {
        width: '100%',
        height: '100%',
    },
    headerOverlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingTop: 60,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    nickname: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    redId: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 5,
        paddingHorizontal: 30
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    bio: {
        fontSize: 14,
        color: '#333',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: -10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    },
    gridItem: {
        width: '33.33%',
        padding: 5,
    },
    gridImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    gridTitle: {
        fontSize: 12,
        marginTop: 5,
        color: '#333',
    },
    gridStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    gridStatsText: {
        fontSize: 10,
        color: '#999',
    },
});