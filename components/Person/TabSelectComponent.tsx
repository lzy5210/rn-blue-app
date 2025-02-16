import { useGlobleContext } from "@/store/globleProvider"
import { transform } from "lodash"
import { useEffect, useRef, useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet, Animated, Image } from "react-native"

const tabList = [
    {
        title: '笔记',
        key: 'note'
    },
    {
        title: '收藏',
        key: 'collect'
    },
    {
        title: '赞过',
        key: 'like'
    },
    {
        title: '私密',
        key: 'private'
    }
]
const TabSelectComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0)
    const { state }: any = useGlobleContext();
    const translateY = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(translateY, {
            toValue: state.isStickyHeader ? 5 : 0, // 根据状态决定 Y 轴偏移量
            duration: 300, // 动画持续时间
            useNativeDriver: true, // 使用原生驱动
        }).start();
    }, [state.isStickyHeader]); // 监听 `state.isStickyHeader` 的变化

    return (
        <View style={styles.tabContainer}>
            {tabList.map((item, index) => (
                <TouchableOpacity
                    key={item.key}
                    style={styles.tabItem}
                    onPress={() => setActiveTab(index)}
                >
                    <Animated.Text
                        style={[
                            styles.tabText,
                            activeTab === index && styles.activeTab,
                            {
                                transform: [{ translateY: translateY }] // 使用动画值
                            }
                        ]}
                    >
                        {item.title}
                    </Animated.Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default TabSelectComponent

const styles = StyleSheet.create({
    tabContainer: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginTop: -15,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
    },
    tabText: {
        // paddingTop: !state.isStickyHeader ? 0 : 10,
        fontSize: 16,
        color: '#666',
    },
    activeTab: {
        color: '#333',
        fontWeight: 'bold',
    },
})