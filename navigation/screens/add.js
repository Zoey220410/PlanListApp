import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';

const CommunityScreen = () => {
  // 假设有一个帖子数组，每个帖子包含图片URL、标题、用户名和点赞数
  const posts = [
    // 填充数据示例，你应该从你的后端服务获取这些数据
    {
      id: '1',
      imageUrl: 'your_post_image_url_here',
      title: 'My month of workouts',
      username: 'Monica',
      likes: 227
    },
    {
      id: '2',
      imageUrl: 'your_post_image_url_here',
      title: 'Get up early and study',
      username: 'Jackson',
      likes: 150
    },
    // 更多帖子...
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DISCOVER</Text>
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Recommendation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          {/* 搜索图标 */}
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Image style={styles.postImage} source={{ uri: item.imageUrl }} />
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postUser}>{item.username}</Text>
              <Text style={styles.postLikes}>{item.likes}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        {/* 底部导航栏内容 */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFC0CB',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  tabButton: {
    padding: 10,
  },
  tabButtonText: {
    fontSize: 16,
    color: '#000',
  },
  postCard: {
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  postContent: {
    padding: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  postUser: {
    fontSize: 14,
    color: '#000',
    opacity: 0.6,
  },
  postLikes: {
    fontSize: 14,
    color: '#000',
    opacity: 0.6,
  },
  footer: {
    // 底部导航栏样式
  },
});

export default CommunityScreen;
