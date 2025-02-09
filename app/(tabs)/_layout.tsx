import { Redirect, router, Tabs, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Animated, Easing, Text, Image, View } from 'react-native';
import { useGlobleContext } from '@/store/globleProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetArtWorkData, GetCategorys } from '@/api/artwork/artwork';
import { GetUserInfo } from '@/api/user/user';


const routers: Array<any> = [{
  id: 1,
  routerName: '首页',
  icon: 'search',
  name: 'index'
}, {
  id: 2,
  routerName: '热门',
  icon: 'play',
  name: 'video',
}, {
  id: 3,
  routerName: '',
  icon: '',
  name: 'publish',
}, {
  id: 4,
  routerName: '详情',
  icon: 'header',
  name: 'explore',
}, {
  id: 5,
  routerName: '我的',
  icon: '',
  name: 'mine',
}]

// 🎯 自定义组件：带有动画的 Tab 图标
const AnimatedIcon = ({ name, color, focused }: any) => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // 初始化缩放动画
  if (focused) {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3, // 放大
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // 恢复
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      {
        name != '' ? <Text style={{ marginTop: 10, color: '#8a8a8a', fontSize: 15, fontWeight: '600' }}>{name}</Text> :
          <Image source={require('@/assets/release.png')} style={{ width: 50, height: 40, marginTop: 15 }} />
      }
    </Animated.View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { state, dispatch }: any = useGlobleContext();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ 控制加载状态
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const loginId = await AsyncStorage.getItem("loginId");
        setToken(storedToken);
        setIsLoading(false); // ✅ 让 UI 先恢复
        if (storedToken && loginId) {
          // ✅ 并行加载数据（加速）
          const [artworkRes, userRes, categoryRes] = await Promise.all([
            GetArtWorkData({ pageNum: 1, pageSize: 10 }),
            GetUserInfo(loginId.toString()),
            GetCategorys(),
          ])
          // ✅ 更新作品列表
          if (artworkRes) {
            dispatch({ type: "SET_ARTWORKS", payload: artworkRes });
          }
          // ✅ 更新用户信息
          if (userRes) {
            dispatch({ type: "SET_USER_INFO", payload: userRes });
          }
          // ✅ tab信息
          if (categoryRes.data) {
            const indexTabs = [
              {
                name: '关注',
                offset: 0,
                child: [],
              },
              {
                name: '全部',
                offset: 1,
                child: artworkRes.records,
              },
            ];

            // 处理所有分类的请求
            const categoryDataPromises = categoryRes.data.map((category: any) =>
              GetArtWorkData({ pageNum: 1, pageSize: 10, categoryIds: [category.id] })
            );

            // 等待所有请求完成
            const categoryDataResults = await Promise.all(categoryDataPromises);

            // 组合数据
            categoryDataResults.forEach((res, index) => {
              indexTabs.push({
                name: categoryRes.data[index].categoryName,
                offset: index + 2,
                child: res.records, // 假设 `res.records` 是数据
              });
            });
            indexTabs.push({
              name: '杭州',
              offset: indexTabs.length,
              child: []
            })
            dispatch({ type: "SET_INDEXTABS", payload: indexTabs });
          }

        }
      } catch (error) {
        console.error("加载数据失败:", error);
      }
    }
    loadToken();
  }, []);

  // ✅ 数据加载中，显示加载指示器，避免跳转闪烁
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // ✅ 如果没有 token，跳转到登录页面
  if (!token) {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#ffffff', // 设置 iOS 背景颜色（半透明黑色）
          },
          android: {
            backgroundColor: '#ffffff', // Android 背景颜色
          },
          default: {
            backgroundColor: '#f8f8f8', // 默认背景颜色
          },
        }),
      }}>
      {
        routers.map((router: any) => (
          <Tabs.Screen
            key={router.id}
            name={router.name}
            options={{
              title: "",
              tabBarIcon: ({ color, focused }) => {
                return <AnimatedIcon name={router.routerName} color={color} focused={focused} />
              },
            }}
          />
        ))
      }
    </Tabs>
  );

}
