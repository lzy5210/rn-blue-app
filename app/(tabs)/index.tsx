import { useGlobleContext } from '@/store/globleProvider';
import { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, Text, View, ActivityIndicator, Dimensions, Animated } from 'react-native'
import MineHeaderComponent from '@/components/Index/MineHeaderComponent';
import WaterfallFlowContainerComponent from '@/components/Index/WaterfallFlowContainerComponent';
import TabsComponent from '@/components/Index/TabsComponent';

const screenWidth = Dimensions.get("window").width;

//首页
export default function RootIndexListScreen() {
  const { state, dispatch }: any = useGlobleContext();
  const flatListRef = useRef<FlatList>(null);
  const [tabsData, setTabsData] = useState<Array<any>>([])
  const [isShowTab, setIsShowTab] = useState(true)
  const translateY = useRef(new Animated.Value(0)).current; // 初始为 0
  //默认从1开始滚动
  const [scrollToOffset, setScrollToOffset] = useState<number>(1)

  const [loading, setLoading] = useState(true);
  //加载首屏数据
  useEffect(() => {
    if (state.indexTabs && state.indexTabs.length > 0) {
      setTabsData(state.indexTabs)
      setLoading(false)
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: scrollToOffset, animated: true });
      }, 100);
    }
  }, [state.indexTabs]);

  //顶部Tab触发改变
  const onChangeOffset = (scrollToOffset: number) => {
    if (tabsData.length > 0 && flatListRef.current) {
      setScrollToOffset(scrollToOffset)
      flatListRef.current?.scrollToIndex({ index: scrollToOffset, animated: true });
    }
  }
  //如果tabs收起来或者关闭触发
  useEffect(() => {
    // if (!isShowTab) {
    //   console.log('开始变更数据源');
    //   flatListRef.current?.scrollToIndex({ index: 1, animated: true });
    //   const changeTabs = state.indexTabs.slice(0, 3);
    //   //还原数据源
    //   setTabsData(changeTabs)
    // } else {
    //   //还原数据源
    //   setTabsData(state.indexTabs)
    //   // setLoading(false)
    // }
    Animated.timing(translateY, {
      toValue: isShowTab ? 0 : -50, // 🚀 平滑移动到目标位置
      duration: 300, // 动画时长
      useNativeDriver: true, // 提高性能
    }).start();
  }, [isShowTab]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <MineHeaderComponent />
      <TabsComponent
        isShowTab={isShowTab}
        tabArray={tabsData}
        scrollToOffset={scrollToOffset}
        onChangeOffset={onChangeOffset} />
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateY }]
        }}>
        <FlatList
          ref={flatListRef}
          data={tabsData}
          renderItem={({ item, index }) => (
            <WaterfallFlowContainerComponent
              scrollToOffset={scrollToOffset}
              artWorkData={item.child}
              onScrollEvent={(isShowTab: boolean) => setIsShowTab(isShowTab)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 100, // item滑动80%部分才会到下一个
          }}
          onScroll={event => {
            const { width } = Dimensions.get('window');
            const offsetX = event.nativeEvent.contentOffset.x; // 获取水平滚动的偏移量
            const progress = offsetX / (width * (tabsData.length - 1)); // 计算滑动进度 0~1
            // console.log('滑动进度:', progress.toFixed(2)); // 取 2 位小数
          }}
          getItemLayout={(data, index) => ({
            length: screenWidth, // 每个 item 的宽度
            offset: screenWidth * index, // item 在滚动区域的偏移
            index,
          })}
          onMomentumScrollEnd={event => {
            const { width } = Dimensions.get('window'); // 获取屏幕宽度
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            if (newIndex >= 0 && newIndex < tabsData.length) {
              const currentItem = tabsData[newIndex]
              console.log('currentItem.offset===>>', currentItem.offset);

              setScrollToOffset(currentItem.offset)
            }
          }}
          snapToInterval={Dimensions.get('window').width} // 确保每次滑动一个屏幕
          snapToAlignment="center"
          decelerationRate="fast"
          bounces={false}
        />
      </Animated.View>
    </View>
  )
}
