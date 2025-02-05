import { RenderItemImg } from '@/components/CardItemComponent';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, Dimensions, ImageBackground } from 'react-native';
const { width } = Dimensions.get("window");  // 屏幕宽度
import axios from 'axios';

export default function CardScreen() {
    const data = [{
        id: 1,
        img: require('@/assets/bizhi/b1.jpg')
    }, {
        id: 2,
        img: require('@/assets/bizhi/b2.jpg')
    }, {
        id: 3,
        img: require('@/assets/bizhi/b3.jpg')
    }, {
        id: 4,
        img: require('@/assets/bizhi/b4.jpg')
    }, {
        id: 5,
        img: require('@/assets/bizhi/b5.jpg')
    }, {
        id: 6,
        img: require('@/assets/bizhi/b6.jpg')
    }, {
        id: 7,
        img: require('@/assets/bizhi/b7.jpg')
    }]
    useEffect(() => {
        axios.get('http://img.fenei.net/assets/pe/Gb2kW13MCE10756Hb9Wr.png')
            .then((response) => {
                console.log(response.data);  // 在控制台查看返回的数据

            })
            .catch((error) => {
                console.error(error);
            });
    }, [])
    const [currentItem, setCurrentItem] = useState<any>(() => data[0])
    const _onViewableItemsChanged = (item: any) => {
        if (item.viewableItems.length > 0) {
            setCurrentItem(item.viewableItems[0].item)
        }
    }
    return (
        <ImageBackground source={currentItem?.img} blurRadius={30} style={{ flex: 1 }}>
            <FlatList
                horizontal
                data={data}
                pagingEnabled={true}
                renderItem={({ item, index }) => (
                    <RenderItemImg
                        currentItem={currentItem}
                        item={item}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                onViewableItemsChanged={_onViewableItemsChanged}
                viewabilityConfig={{
                    waitForInteraction: true,
                    viewAreaCoveragePercentThreshold: 80, // item滑动80%部分才会到下一个
                }}
                snapToAlignment="center"
                decelerationRate="fast"
                bounces={false}
            />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width,
                marginBottom: 40
            }}>
                <Text style={{ fontWeight: '600', fontSize: 16, color: '#fff' }}>长按保存</Text>
            </View>
        </ImageBackground>
    );
}


