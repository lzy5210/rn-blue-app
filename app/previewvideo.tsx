
import { Text, SafeAreaView, StyleSheet, View, Alert, Keyboard, TouchableOpacity, FlatList, Button, Linking, StatusBar, Dimensions } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import * as Contacts from 'expo-contacts';
import { useCallback, useEffect, useState } from 'react';
import ShortVideoItem from '@/components/ShortVideoItem';
import { GetArtWorkData, GetArtWorkInfo } from '@/api/artwork/artwork';

// interface ItemData {
//     pause: boolean;
//     id: number;
// }
const HEIGHT = Dimensions.get('screen').height;
export default function PreviewVideoScreen() {


    const [currentItem, setCurrentItem] = useState(0);
    const [data, setData] = useState<any[]>([]);
    // 获取传递的参数
    const { id } = useLocalSearchParams();

    useEffect(() => {
        getAllVideoList()
    }, [id])

    //获取所有视频列表
    const getAllVideoList = async () => {
        try {
            const { records } = await GetArtWorkData({ artworkType: "1" });
            setData(records)
            const res = await getArtWorkPageData(id)
            console.log('res===>>',res);
            
            // console.log('res==>>', res.records[0].id);
            const index = records.findIndex((item: any) => item.id === id);
            console.log('index===>>', index);
            setCurrentItem(index)
        } catch {

        }

    }
    const getArtWorkPageData = async (id: any) => {
        try {
            const res = await GetArtWorkInfo({ id });
            return res;
        } catch (err) {
            // Alert.alert(err);
            throw err; // 抛出错误以便在调用处捕获
        }
    };
    const _onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
        // 这个方法为了让state对应当前呈现在页面上的item的播放器的state
        // 也就是只会有一个播放器播放，而不会每个item都播放
        // 可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
        // 只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
        if (viewableItems.length === 1) {
            // setCurrentItem(viewableItems[0].index);
            setCurrentItem(3)
        }
    }, []);

    // console.log('id==>>', id);
    // const [contacts, setContacts]: any = useState([]);
    // const [permissionGranted, setPermissionGranted] = useState(false)

    // useEffect(() => {
    //     const getPermission = async () => {
    //         const { status } = await Contacts.requestPermissionsAsync(); // 请求通讯录权限
    //         if (status === 'granted') {
    //             setPermissionGranted(true);
    //             // loadContacts();
    //         } else {
    //             console.log('Permission to access contacts was denied');
    //         }
    //     };
    //     getPermission();
    // }, []);

    // const handleCall = (phoneNumber: any) => {
    //     const url = `tel:${phoneNumber}`;
    //     Linking.openURL(url)
    //         .catch((err) => console.error('Failed to open dialer:', err));
    // };

    // const renderItem = ({ item }: any) => (
    //     <View>
    //         <Text>{item.name}</Text>
    //         {item.phoneNumbers && item.phoneNumbers.length > 0 && (
    //             <Button
    //                 title={`Call ${item.name}`}
    //                 onPress={() => handleCall(item.phoneNumbers[0].number)}
    //             />
    //         )}
    //     </View>
    // );


    // if (!permissionGranted) {
    //     return <Text>Permission not granted</Text>;
    // }
    // return (
    //     <FlatList
    //         data={contacts}
    //         renderItem={renderItem}
    //         keyExtractor={(item) => item.id}
    //     />
    // );
    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor="transparent"
                translucent
            />
            <FlatList<any>
                data={data}
                renderItem={({ item, index }) => (
                    <ShortVideoItem
                        paused={index !== currentItem}
                        id={item.id}
                        artworkVideo={item.artworkVideo}
                    />
                )}
                pagingEnabled={true}
                getItemLayout={(item, index) => {
                    return { length: HEIGHT, offset: HEIGHT * index, index };
                }}
                onViewableItemsChanged={_onViewableItemsChanged}
                keyExtractor={(item, index) => index.toString()}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 80, // item滑动80%部分才会到下一个
                }}
            />
        </View>
    )
}