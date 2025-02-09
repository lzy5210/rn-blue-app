import { RenderItemImg } from '@/components/CardItemComponent';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, Dimensions, ImageBackground } from 'react-native';
const { width } = Dimensions.get("window");  // 屏幕宽度
import axios from 'axios';

export default function CardScreen() {
    const data = [{
        id: 7,
        img: 'https://reactnative.dev/img/tiny_logo.png'
    }, {
        id: 8,
        img: 'https://oss.iblut.cn:9000/blue-oss/0f736976e604e7696a1e2857fed7e37.jpg'
    }, {
        id: 9,
        img: 'https://p3-sign.douyinpic.com/tos-cn-i-p14lwwcsbr/0a1096a8fd3a4d5e96c2ec0391eea20d~tplv-p14lwwcsbr-x2-q75-r:248:332:q75.jpeg?lk3s=7b078dd2&x-expires=1739116800&x-signature=cNJZhgdezqsk638zumFujEr%2BwGc%3D&from=2064092626&se=false&sc=thumb&biz_tag=aweme_comment&l=20250209183550E31DB08F71295F88E81E'
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


