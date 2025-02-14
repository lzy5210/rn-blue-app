import React, { useEffect } from 'react';
import { Modal, Text, Button, View, StyleSheet, TouchableOpacity, Dimensions, Animated, DrawerLayoutAndroid } from 'react-native';
import { Easing, withTiming } from 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer';
const UnfoldComponent: React.FC<{
    drawerOpen: boolean,
    children: React.ReactNode,
    handleUnfoldClose: (isShow: boolean) => void
}> = ({
    drawerOpen,
    children,
    handleUnfoldClose
}) => {

        // 用于渲染 Drawer 内容的组件
        const renderNavigationView = () => (
            <View style={styles.drawer}>
                <Text style={styles.drawerText}>侧边菜单</Text>
                <Button
                    title="关闭菜单"
                    onPress={() => handleUnfoldClose(false)}
                />
            </View>
        );

        return (
            <DrawerLayoutAndroid
                drawerWidth={300}  // 设置抽屉的宽度
                drawerPosition="left"  // 设置抽屉的位置，'left' 或 'right'
                renderNavigationView={renderNavigationView}  // 侧边菜单的内容
                onDrawerOpen={() => handleUnfoldClose(true)}  // 侧边菜单打开时的回调
                onDrawerClose={() => handleUnfoldClose(false)}  // 侧边菜单关闭时的回调
            >
                <View style={styles.container}>
                    <Text style={styles.text}>主页面内容</Text>
                    <Button
                        title="打开侧边菜单"
                        onPress={() => handleUnfoldClose(true)}
                    />
                </View>
            </DrawerLayoutAndroid>
        );
    };

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
    drawer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
    },
    drawerText: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default UnfoldComponent;
