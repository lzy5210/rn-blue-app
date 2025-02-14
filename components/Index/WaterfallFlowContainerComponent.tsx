import { GetArtWorkData } from "@/api/artwork/artwork";
import { useGlobleContext } from "@/store/globleProvider";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import throttle from 'lodash/throttle';
import {
    View, Text, Image, StyleSheet, Dimensions,
    RefreshControl, TouchableOpacity, FlatList,
    ActivityIndicator
} from "react-native";
import { router } from "expo-router";
import MasonryList from '@react-native-seoul/masonry-list';

const { width: screenWidth } = Dimensions.get("window");

const WaterfallFlowContainerComponent: React.FC<{
    artWorkData: Array<any>
    categoryIds: Array<any>
    onScrollEvent: (isShow: boolean) => void
    scrollToOffset: number
    index: number
}> = ({ artWorkData, onScrollEvent, categoryIds, scrollToOffset, index }) => {
    const { state, dispatch }: any = useGlobleContext();
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState(false)
    const [isLoadMore, setIsLoadMore] = useState<boolean>(false)
    const [queryParams, setQueryParams] = useState<{
        pageNum: number,
        pageSize: number,
        categoryIds: Array<any>
    }>({
        pageNum: 1,
        pageSize: 10,
        categoryIds
    })

    //初始化操作
    useEffect(() => {
        if (index == scrollToOffset) {
            waterFallFlowInit()
        }
    }, [scrollToOffset])

    //页面切换初始换还原
    const waterFallFlowInit = () => {
        console.log('开始还原');
        setIsEmpty(false)
        setRefreshing(false)
        setIsLoadMore(false)
        setQueryParams({
            pageNum: 1,
            pageSize: 10,
            categoryIds
        })
    }

    useEffect(() => {
        if (index == scrollToOffset) {
            console.log(isLoadMore);
        }
    }, [isLoadMore])

    const handleScroll = useCallback((event: any) => {
        const { contentOffset } = event.nativeEvent;
        const offsetY = contentOffset.y;
        onScrollEvent(offsetY < 60);
    }, [onScrollEvent]);

    const onRefresh = useCallback(async () => {
        const { categoryIds } = queryParams
        waterFallFlowInit()
        if (categoryIds) {
            setRefreshing(true);
            try {
                const { records } = await GetArtWorkData({ pageNum: 1, pageSize: 10, categoryIds });
                const updatedIndexTabs = state.indexTabs.map((tab: any) => {
                    if (tab.categoryIds == categoryIds) {
                        return {
                            ...tab,
                            child: records,
                        };
                    }
                    return tab;
                });
                dispatch({ type: "SET_INDEXTABS", payload: updatedIndexTabs });
            } catch (error) {
                console.error('刷新失败:', error);
            } finally {
                setTimeout(() => {
                    setRefreshing(false);
                }, 1500)
            }
        }
    }, [dispatch]);

    const loadMoreData = throttle(async () => {
        if (index === scrollToOffset && categoryIds && !isEmpty && !isLoadMore) {
            setIsLoadMore(true);
            try {
                const { pageNum, pageSize, categoryIds } = queryParams;
                
                const { records } = await GetArtWorkData({ pageNum, pageSize, categoryIds });
    
                if (records.length === 0) {
                    setIsEmpty(true)
                    return;
                }
    
                const updatedIndexTabs = state.indexTabs.map((tab: any) => {
                    if (tab.categoryIds == categoryIds) {
                        return {
                            ...tab,
                            child: pageNum === 1 ? records : [...tab.child, ...records],
                        };
                    }
                    return tab;
                });
    
                dispatch({ type: "SET_INDEXTABS", payload: updatedIndexTabs });
                setQueryParams(prevParams => ({
                    ...prevParams,
                    pageNum: prevParams.pageNum + 1,
                }));
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoadMore(false);
            }
        }
    }, 1000); // 1秒的节流时间

    const routerArticleInfo = (item: any) => {
        if (item.artworkType == '0') router.push({ pathname: '/articleInfo', params: { id: item.id } })
        if (item.artworkType == '1') router.push({ pathname: '/previewvideo', params: { id: item.id } })
    }

    const renderItem = useCallback(({ item }: { item: any }) => (
        <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8} onPress={() => routerArticleInfo(item)}>
            <Image
                style={[styles.itemImage, { height: item.height }]} // 随机高度实现瀑布流效果
                resizeMode="cover"
                resizeMethod="resize"
                source={{ uri: item.previewImg }}
            />
            <View style={styles.content}>
                <Text style={styles.titleDes}>{item.artworkTitle}</Text>
                <View style={styles.userInfo}>
                    <View style={styles.leftAvatar}>
                        <Image style={styles.avatar} source={{ uri: item.litUserInfo.avatar || 'https://reactnative.dev/img/tiny_logo.png' }} />
                        <Text style={styles.nickName}>{item.litUserInfo.nickName}</Text>
                    </View>
                    <TouchableOpacity style={styles.rightLike}>
                        <Image source={require('@/assets/index/like.png')} style={styles.likeIcon} />
                        <Text style={styles.likeNums}>{item.likeNums}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.previewImg}>
                <Image style={{ width: 30, height: 30 }}
                    source={item.artworkType == '0' ? require('@/assets/index/article.png') : require('@/assets/index/video.png')} />
            </View>
        </TouchableOpacity>
    ), []);

    return (
        <View style={{ width: screenWidth }}>
            <MasonryList
                data={artWorkData}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.flatListContainer} 
                onEndReached={loadMoreData}
                onScroll={handleScroll}
                renderItem={renderItem}
                refreshing={refreshing}
                onRefresh={onRefresh}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => <Text>暂无更多内容了</Text>}
                ListFooterComponent={
                    isEmpty ? (
                        <View style={styles.loadingContainer}>
                            <Text>没有更多了~</Text>
                        </View>
                    ) : (isLoadMore && index === scrollToOffset) ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#a0b9fe" />
                            <Text>加载更多</Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    previewImg: {
        position: 'absolute',
        margin: 5,
        top: 0,
        right: 0
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    flatListContainer: {
        backgroundColor: "#f9f9f9",
        paddingBottom: 100,
        paddingHorizontal: 10,
    },
    itemContainer: {
        flex: 1,
        backgroundColor: "#fff",
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 10,
        overflow: "hidden",
        position: 'relative'
    },
    itemImage: {
        width: "100%",
    },
    content: {
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    titleDes: {
        marginTop: 5,
        fontWeight: "500",
    },
    userInfo: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftAvatar: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    nickName: {
        fontSize: 12,
        color: "#8a8a8a",
        marginLeft: 5,
    },
    rightLike: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeIcon: {
        width: 15,
        height: 15,
    },
    likeNums: {
        fontSize: 14,
        color: "#8a8a8a",
        marginLeft: 5,
    },
});

export default WaterfallFlowContainerComponent;
