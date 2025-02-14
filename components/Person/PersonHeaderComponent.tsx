import { useGlobleContext } from '@/store/globleProvider';
import React, { useEffect } from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"

const PersonHeaderComponent: React.FC = () => {
    const { state, dispatch }: any = useGlobleContext();
    const handleLoadMore = () => {
        console.log('触发更多');

    }
    useEffect(() => {
        if (state.isStickyHeader) {
            // Alert.alert('开始吸顶');
            console.log('开始吸顶');
        } else {
            console.log('结束吸顶');
            // Alert.alert('结束吸顶');
        }
    }, [state.isStickyHeader]);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={handleLoadMore}>
                    <Image style={{ width: 25, height: 25 }} source={require('@/assets/person/list.png')} />
                </TouchableOpacity>
                <View style={styles.rightLogo}>
                    <TouchableOpacity>
                        <Image style={{ width: 20, height: 20 }} source={require('@/assets/person/sys.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.share}>
                        <Image style={{ width: 25, height: 25 }} source={require('@/assets/person/share.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'rgba(85, 85, 85, 0.3)'
    },
    headerContent: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15,
    },
    rightLogo: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    share: {
        marginLeft: 10
    }
})
export default PersonHeaderComponent
