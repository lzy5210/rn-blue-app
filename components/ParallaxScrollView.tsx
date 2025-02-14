import { useState, type PropsWithChildren, type ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import PersonHeaderComponent from '@/components/Person/PersonHeaderComponent';
import { useGlobleContext } from '@/store/globleProvider';

const HEADER_HEIGHT = 350;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const { state, dispatch }: any = useGlobleContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });
  const handleLoadMore = () => {
    console.log('触发更多');

  }
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ThemedView style={styles.container}>
      <PersonHeaderComponent />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        stickyHeaderIndices={[1]}
        onScroll={(event: any) => {
          if (event.nativeEvent.contentOffset.y > 240) {
            dispatch({ type: 'SET_STICKY_HEADER', payload: true });
          } else {
            dispatch({ type: 'SET_STICKY_HEADER', payload: false });
          }
        }}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tabItem}
          >
            <Text style={[styles.tabText, activeTab === 0 && styles.activeTab]}>笔记</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
          >
            <Text style={[styles.tabText, activeTab === 1 && styles.activeTab]}>收藏</Text>
          </TouchableOpacity>
        </View>
        <ThemedView style={state.isStickyHeader}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  }, 
  tabContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTab: {
    color: '#333',
    fontWeight: 'bold',
  },
});
