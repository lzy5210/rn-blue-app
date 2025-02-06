import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native'
const TabsComponent: React.FC<{
    tabArray: Array<any>,
    //滚动下标
    scrollToOffset: number,
    //触发列表页更新
    onChangeOffset: (scrollToOffset: number) => void
}> = ({
    tabArray,
    scrollToOffset,
    onChangeOffset
}) => {
        const [tabData, setTabData] = useState<Array<any>>([])
        const tabsRef = useRef<FlatList>(null);
        useEffect(() => {
            if (tabArray) {
                const newArr = tabArray.map((tab: any) => ({ name: tab.name, offset: tab.offset }))
                setTabData(newArr)
            }
        }, [tabArray])
        useEffect(() => {
            if (tabData.length > 0 && tabsRef.current) {
                const index = tabData.findIndex(tab => tab.offset === scrollToOffset);
                if (index !== -1) {
                    tabsRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
                }
            }
        }, [scrollToOffset])
        return (
            <View style={styles.tabsContainer}>
                {
                    tabData &&
                    <View style={styles.tabsListArray}>
                        <FlatList
                            ref={tabsRef}
                            data={tabData}
                            renderItem={({ item, index }) => {
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
            </View>
        )
    }

const styles = StyleSheet.create({
    tabsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    tabsListArray: {
        width: '90%',
    },
    tabItem: {
        marginRight: 30,
    }
})
export default TabsComponent