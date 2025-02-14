import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function TabTwoScreen() {
  const [messages] = useState([
    {
      id: 1,
      type: '赞和收藏',
      icon: '❤️',
      unread: true
    },
    {
      id: 2, 
      type: '新增关注',
      icon: '👤',
      unread: false
    },
    {
      id: 3,
      type: '评论和@',
      icon: '💬',
      unread: true
    },
    {
      id: 4,
      name: 'HadiMkvtr',
      avatar: 'https://picsum.photos/50',
      lastMessage: 'Hi',
      time: '07:49'
    },
    {
      id: 5,
      name: '小红书6028t073',
      avatar: 'https://picsum.photos/50',
      lastMessage: '今天在线',
      time: '2024-12-29'
    }
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>消息</Text>
      
      <ScrollView>
        {/* 系统消息部分 */}
        <View style={styles.systemSection}>
          {messages.slice(0,3).map(item => (
            <TouchableOpacity key={item.id} style={styles.systemItem}>
              <View style={[styles.iconContainer, item.unread && styles.unread]}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>
              <Text style={styles.systemText}>{item.type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 聊天列表部分 */}
        <View style={styles.chatSection}>
          {messages.slice(3).map(item => (
            <TouchableOpacity key={item.id} style={styles.chatItem}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
              <View style={styles.chatContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message}>{item.lastMessage}</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15
  },
  systemSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  systemItem: {
    alignItems: 'center'
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  unread: {
    backgroundColor: '#ffe4e4'
  },
  icon: {
    fontSize: 20
  },
  systemText: {
    fontSize: 12,
    color: '#666'
  },
  chatSection: {
    paddingHorizontal: 15
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  chatContent: {
    flex: 1,
    marginLeft: 10
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  message: {
    fontSize: 14,
    color: '#666'
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10
  }
});
