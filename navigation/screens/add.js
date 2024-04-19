import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { IconButton } from "react-native-paper";

import Post from "../../components/Post";

const CommunityScreen = () => {
  // 假设有一个帖子数组，每个帖子包含图片URL、标题、用户名和点赞数
  const testData = [
    // 填充数据示例，你应该从你的后端服务获取这些数据
    {
      id: "1",
      imageUrl: "your_post_image_url_here",
      title: "My month of workouts",
      content: "Happy!",
      username: "Monica",
      likes: 227,
      isLiked: false,
    },
    {
      id: "2",
      imageUrl: "your_post_image_url_here",
      title: "Get up early and study",
      content: "Study day!!",
      username: "Jackson",
      likes: 150,
      isLiked: false,
    },
    // 更多帖子...
  ];

  const [posts, setPosts] = useState(testData);
  const [heartColors, setHeartColors] = useState(
    Array(posts.length).fill("black")
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handlePress = (index) => {
    const newColors = [...heartColors];
    newColors[index] = newColors[index] === "black" ? "pink" : "black";
    setHeartColors(newColors);
    const newPosts = [...posts];
    const post = newPosts[index];
    if (post.isLiked) {
      post.likes -= 1;
    } else {
      post.likes += 1;
    }
    post.isLiked = !post.isLiked;
    newPosts[index] = post;
    setPosts(newPosts);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headTitle}>
        <Text style={styles.text}>Discover</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>DISCOVER</Text>
      </View> */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        style={{ flex: 0.8 }}
        renderItem={({ item, index }) => (
          <View style={styles.postCard}>
            <Image
              style={styles.postImage}
              source={require("../../images/background.png")}
            />
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.content}>{item.content}</Text>
              <View style={styles.row}>
                <Text style={styles.postUser}>{item.username}</Text>
                <IconButton
                  icon="heart"
                  size={20}
                  onPress={() => handlePress(index)}
                  iconColor={heartColors[index]}
                />
                <Text style={styles.postLikes}>{item.likes}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <View>
        <Post visible={modalVisible} onClose={handleModalClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
  header: {
    flex: 0.2,
    backgroundColor: "#FFC0CB",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  tabButton: {
    padding: 10,
  },
  tabButtonText: {
    fontSize: 16,
    color: "#000",
  },
  postCard: {
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  postImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  postContent: {
    padding: 10,
  },
  postContent: {
    margin: "2%",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#009",
  },
  postUser: {
    fontSize: 14,
    color: "#000",
    opacity: 0.6,
  },
  postLikes: {
    fontSize: 14,
    color: "#000",
    opacity: 0.6,
  },
  headTitle: {
    flex: 0.2,
    backgroundColor: "#FFC0CB",
    mixBlendMode: "multiply",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "5%",
    marginBottom: "2%",
  },
  text: {
    color: "black",
    fontSize: 32,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    margin: "2%",
  },
  addText: {
    fontSize: 26,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default CommunityScreen;
