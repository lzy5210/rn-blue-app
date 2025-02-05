import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, RefreshControl, TouchableOpacity } from "react-native";
import WaterfallFlow from "react-native-waterfall-flow";

const WaterfallFlowContainerComponent: React.FC<{
    artWorkData: Array<any>
}> = ({ artWorkData }) => {
    const [refreshing, setRefreshing] = useState(false);
    // const [listData, setListData] = useState(data);
    // 下拉刷新处理函数
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // 模拟网络请求
        setTimeout(() => {
            // // 假设刷新后返回的新数据
            // const newData = Array.from({ length: 50 }, (_, index) => `Item ${index + 51}`);
            // setListData(newData);
            // setRefreshing(false);
        }, 2000);
    }, []);

    const RenderWaterItem: React.FC<{
        item: any
    }> = ({ item }) => {
        return (
            <View
                style={{
                    height: item.height,
                    margin: 5,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    justifyContent: 'space-between'
                }}
            >
                <View style={styles.logo}>
                    <Image
                        source={{ uri: item.previewImg }}
                        resizeMode="cover"
                        style={styles.image} // 确保图片宽度填充整个容器
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.titleDes}>{item.artworkTitle}</Text>
                    <View style={styles.userInfo}>
                        <View style={styles.leftAvatar}>
                            <Image style={{ width: 20, height: 20 }} source={{ uri: item.litUserInfo.avatar }} />
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
                style={{ marginBottom: 90, flex: 1 }}
                data={artWorkData}
                contentContainerStyle={{ backgroundColor: '#f9f9f9' }}
                ListEmptyComponent={() => <Text>暂无数据</Text>}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                renderItem={({ item, index, columnIndex }: any) => {
                    return (
                        <RenderWaterItem item={item} />
                    );
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}  // 控制刷新动画
                        onRefresh={onRefresh}    // 下拉触发的刷新事件
                    />
                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    logo: {
        flex: 1,
    },
    content: {
        height: 50,
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