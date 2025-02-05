import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import GlobleProvider from '@/store/globleProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobleProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="login" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="card" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="loginphone"
            // options={{
            //   headerShown: true,
            //   gestureEnabled: false,
            //   headerLeft: () => {
            //     return (
            //       <TouchableOpacity onPress={() => router.back()}>
            //         <Ionicons name="arrow-back" size={24} color="#8a8a8a" />
            //       </TouchableOpacity>
            //     )
            //   },
            //   headerRight: () => {
            //     return (
            //       <TouchableOpacity onPress={() => console.log('点击了右侧按钮')}>
            //         <Text style={{ color: '#8a8a8a', marginRight: 15, fontSize: 16 }}>帮助</Text>
            //       </TouchableOpacity>
            //     )
            //   }
            // }}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GlobleProvider>
  );
}
