import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { IconButton, Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
// import LazyloadView from "react-native-lazyload";
import Post from "../../components/Post";
import { getSharing, updateSharing } from "../../firebase-backend/post-db";
import { useNavigation } from "@react-navigation/native";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DiscoverScreen = () => {
  const [posts, setPosts] = useState([]);
  const [heartColors, setHeartColors] = useState(
    posts ? Array(posts.length).fill("grey") : null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [updatePostIndex, setUpdatePostIndex] = useState(null);
  const [personal, setPersonal] = useState(false);
  // const [userId, setUserId] = useState("");

  const { user, setUser, userAvatarUrl, setUserAvatarUrl } = useContext(
    AuthenticatedUserContext
  );
  const userId = user ? user.uid : "";

  useFocusEffect(
    React.useCallback(() => {
      // setUserId(user ? user.uid : "");
      getPosts(userId);
    }, [personal])
  );

  useEffect(() => {
    getPosts(userId);
  }, [modalVisible]);

  const getPosts = async (userId) => {
    try {
      let postData;
      let filteredPost = [];
      if (!user && personal) {
        filteredPost = [];
      } else if (!personal) {
        postData = await getSharing("all");
        filteredPost = postData.filter((data) => data.privacy !== "Private");
      } else {
        console.log(userId);
        filteredPost = await getSharing(userId);
      }

      const initialHeartColors = filteredPost.map((post) =>
        post.likeByUsers && post.likeByUsers.includes(userId) ? "pink" : "grey"
      );
      setHeartColors(initialHeartColors);

      setPosts(filteredPost);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Failed to fetch posts");
    }
  };

  useEffect(() => {
    const updatePostAsync = async () => {
      try {
        if (updatePostIndex !== null) {
          await updateSharing(posts[updatePostIndex]);
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    };

    if (updatePostIndex !== null) {
      updatePostAsync();
    }
  }, [posts]);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handlePress = (index, userId) => {
    const newColors = [...heartColors];
    const newPosts = [...posts];

    // Get the post at the specified index
    const post = newPosts[index];

    // Check if the user has already liked the post
    const isLiked = post.likeByUsers && post.likeByUsers.includes(userId);

    if (isLiked) {
      // Unlike the post
      post.likes -= 1;
      // Remove userId from likeByUsers array
      post.likeByUsers = post.likeByUsers.filter((id) => id !== userId);
      newColors[index] = "grey";
    } else {
      // Like the post
      post.likes += 1;
      // Add userId to likeByUsers array
      post.likeByUsers.push(userId);
      newColors[index] = "pink";
    }

    // Update the post object in the newPosts array
    newPosts[index] = post;

    // Update state variables
    setHeartColors(newColors);
    setPosts(newPosts);
    setUpdatePostIndex(index);
  };

  const navigation = useNavigation(); // use useNavigation hook

  const handlePostPress = (index) => {
    navigation.navigate("PostDetail", { postInfo: posts[index] }); // navigate to OtherScreen
  };

  const handlePersonal = () => {
    setPersonal(!personal);
    setUpdatePostIndex(null);
    k;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headTitle}>
        <Text style={styles.text}>Discover</Text>
        <Button mode="contained" disabled={false} onPress={handlePersonal}>
          <Text>{personal ? "Turn to Public" : "Turn to Personal"}</Text>
        </Button>
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
          <TouchableOpacity
            style={styles.postCard}
            onPress={() => handlePostPress(index)}
          >
            {item.imageUrl === "" ? null : (
              // <LazyloadView style={{ flex: 1 }}>
              <Image
                style={styles.postImage}
                source={{ uri: item.imageUrl }}
                loading="lazy"
              />
              // </LazyloadView>
            )}
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.content}>{item.content}</Text>
              <View style={styles.row}>
                <Text style={styles.postUser}>{item.userId}</Text>
                <IconButton
                  icon="heart"
                  size={20}
                  onPress={() => handlePress(index, userId)}
                  iconColor={heartColors[index]}
                />
                <Text style={styles.postLikes}>{item.likes}</Text>
              </View>
            </View>
          </TouchableOpacity>
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

export default DiscoverScreen;
