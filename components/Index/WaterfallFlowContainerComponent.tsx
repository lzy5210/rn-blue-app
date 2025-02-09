import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native";
import WaterfallFlow from "react-native-waterfall-flow";

const WaterfallFlowContainerComponent: React.FC<{
    //瀑布流数据流
    artWorkData: Array<any>
    //触发展示或隐藏tab
    onScrollEvent: (isShow: boolean) => void
    //当前tab下标
    scrollToOffset: number
}> = ({ artWorkData, onScrollEvent, scrollToOffset }) => {


    const [refreshing, setRefreshing] = useState(false);
    // 下拉刷新处理函数
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // 模拟网络请求
        setTimeout(() => {
        }, 2000);
    }, []);
    // 上拉加载
    const loadMore = (e: any) => {
        // console.log('e==>>',e);
    };
    const handleScroll = (event: any) => {
        if (scrollToOffset != 1) {
            return
        }
        const offsetY = event.nativeEvent.contentOffset.y; // 获取垂直滚动偏移量
        if (offsetY >= 60) {
            onScrollEvent(false)
        } else {
            onScrollEvent(true)
        }
    }
    const RenderWaterItem: React.FC<{
        item: any
    }> = ({ item }) => {
        return (
            <View
                style={{
                    margin: 5,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    justifyContent: 'space-between'
                }}
            >
                <Image
                    resizeMode="cover"
                    onError={(e) => { console.log("111", e.nativeEvent.error) }}
                    src={`https://oss.iblut.cn/blue-oss/0a1096a8fd3a4d5e96c2ec0391eea20d~tplv-p14lwwcsbr-x2-q75-r_248_332_q75.jpeg`}
                />
                <View style={styles.content}>
                    <Text style={styles.titleDes}>{item.artworkTitle}</Text>
                    <View style={styles.userInfo}>
                        <View style={styles.leftAvatar}>
                            <Image style={{ width: 20, height: 20 }} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                            <Text style={styles.nickName}>
                                {item.litUserInfo.nickName}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.rightLike}>
                            <Image source={require('@/assets/index/like.png')} style={{ width: 15, height: 15 }} />
                            <Text style={styles.likeNums}>
                                {item.likeNums}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ width: Dimensions.get('window').width }}>
            <WaterfallFlow
                showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
                data={artWorkData}
                contentContainerStyle={{ backgroundColor: '#f9f9f9', paddingBottom: 100 }}
                ListEmptyComponent={() => <Text>暂无数据</Text>}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                renderItem={({ item }: any) => {
                    return (
                        <RenderWaterItem item={item} />
                    );
                }}
                onEndReached={loadMore}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}  // 控制刷新动画
                        onRefresh={onRefresh}    // 下拉触发的刷新事件
                    />
                }
                onScroll={handleScroll}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    imageSty: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    logo: {
        width: 200, height: 200,
        flex: 1,
    },
    content: {
        height: 50,
        marginBottom: 5
    },
    titleDes: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        fontWeight: '500'
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5
    },
    leftAvatar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nickName: {
        fontSize: 12,
        color: '#8a8a8a',
        marginLeft: 5
    },
    rightLike: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    likeNums: {
        fontSize: 14,
        color: '#8a8a8a',
        marginRight: 5,
        marginLeft: 5
    }
});
export default WaterfallFlowContainerComponent