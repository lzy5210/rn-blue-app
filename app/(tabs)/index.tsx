import { useGlobleContext } from '@/store/globleProvider';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View, Image, StyleSheet, ActivityIndicator, StatusBar, Dimensions } from 'react-native'
import MineHeaderComponent from '@/components/Index/MineHeaderComponent';
import WaterfallFlowContainerComponent from '@/components/Index/WaterfallFlowContainerComponent';




const getImageHeight = (url: string) => {
  return new Promise<number>((resolve, reject) => {
    Image.getSize(url, (width, height) => {
      resolve(height);
    }, (error) => {
      reject(error);
    });
  });
};


//首页
export default function RootIndexListScreen() {
  const { state, dispatch }: any = useGlobleContext();
  const [artWorkData, setArtWorkData] = useState<Array<any>>([])
  const [tabsData, setTabsData] = useState<Array<any>>([])
  const [loading, setLoading] = useState(true);
  // 监听 `state.artworkList` 更新 data
  useEffect(() => {
    if (state.artworkList && state.artworkList.records) {
      const newList = state.artworkList.records.map((item: any) => {
        return {
          ...item,
          height: Math.floor(Math.random() * 300) + 200
        }
      })
      const tabs = [{
        name: '推荐',
        offset: 1,
        child: newList,
      }, {
        name: '直播',
        offset: 2,
        child: newList,
      }, {
        name: '科技数码',
        offset: 3,
        child: newList,
      }, {
        name: '摄影',
        offset: 4,
        child: newList,
      }, {
        name: '穿搭',
        offset: 5,
        child: newList,
      }, {
        name: '家具',
        offset: 6,
        child: newList,
      }, {
        name: '职场',
        offset: 7,
        child: newList,
      }]
      setTabsData(tabs)
      setArtWorkData(newList); // 确保 records 里有数据
      setLoading(false); // 关闭 loading
    }
  }, [state.artworkList]);

  useEffect(() => {

  }, [artWorkData])

  useEffect(() => {
  }, [tabsData])
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MineHeaderComponent />
      <FlatList
        style={{ flex: 1 }}
        data={tabsData}
        renderItem={({ item, index }) => (
          <WaterfallFlowContainerComponent artWorkData={item.child} />
        )}
        horizontal
        pagingEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 100, // item滑动80%部分才会到下一个
        }}
        snapToAlignment="center"
        decelerationRate="fast"
        bounces={false}
      />

    </View>
  )
}
