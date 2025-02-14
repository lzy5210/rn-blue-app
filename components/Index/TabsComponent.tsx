import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
const TabsComponent: React.FC<{
    tabArray: Array<any>,
    //滚动下标
    scrollToOffset: number,
    //触发列表页更新
    onChangeOffset: (scrollToOffset: number) => void,
    //是否展示
    isShowTab: boolean
}> = ({
    isShowTab,
    tabArray,
    scrollToOffset,
    onChangeOffset
}) => {
        //正在滚动
        const [isRuningScroll, setIsRuningScroll] = useState(false)
        const [tabData, setTabData] = useState<Array<any>>([])
        const tabsRef = useRef<FlatList>(null);
        useEffect(() => {
            if (tabArray) {
                setTabData(tabArray)
            }
        }, [tabArray])
        useEffect(() => {     
            if (tabData.length > 0 && tabsRef.current) {     
                const index = tabData.findIndex(tab => tab.offset === scrollToOffset)
                if (index !== -1) {
                    tabsRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
                }
            }
        }, [scrollToOffset])
        return (
            <Animatable.View
                style={[
                    styles.tabsContainer,
                    { transform: [{ translateY: isShowTab ? 0 : -100 }], opacity: isShowTab ? 1 : 0 }
                ]}
                duration={300} // 动画时长
                useNativeDriver={true} // 提高性能
                animation={isShowTab ? 'slideInUp' : 'slideOutDown'} // 控制动画
            >
                {
                    (tabData) &&
                    <View style={styles.tabsListArray}>
                        <FlatList
                            ref={tabsRef}
                            data={tabData}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={styles.tabItem} onPress={() => onChangeOffset(item.offset)}>
                                        {
                                            scrollToOffset == item.offset ? <Text style={{ textAlign: 'left', color: '#1a1a1a', fontWeight: 'bold' }}>{item.name}</Text>
                                                : <Text style={{ textAlign: 'left', color: '#8a8a8a' }}>{item.name}</Text>
                                        }
                                    </TouchableOpacity>
                                )
                            }}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            keyExtractor={(item, index) => index.toString()}
                            bounces={false}
                        />
                    </View>
                }
            </Animatable.View>
        )
    }

const styles = StyleSheet.create({
    tabsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#fff'
    },
    tabsListArray: {
        width: '90%',
    },
    tabItem: {
        marginRight: 30,
    }
})
export default TabsComponent