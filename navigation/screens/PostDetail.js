import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  ScrollView,
} from "react-native";
import { TextInput, List, Button, IconButton } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { updateSharing } from "../../firebase-backend/post-db";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PostDetail = () => {
  const { user, setUser, userAvatarUrl, setUserAvatarUrl } = useContext(
    AuthenticatedUserContext
  );
  const userId = user ? user.uid : "";
  const route = useRoute();
  const { postInfo } = route.params;
  const [info, setInfo] = useState(postInfo);
  const [review, setReview] = useState("");
  const [heartColor, setHeartColor] = useState(
    info.likeByUsers && info.likeByUsers.includes(userId) ? "pink" : "grey"
  );

  const handleAdd = async () => {
    if (review.trim() === "") return;
    try {
      const newpost = info;
      const reviewInfo = { content: review, userId: userId };
      newpost.reviews.push(reviewInfo);
      setInfo(newpost);
      await updateSharing(newpost);
      setReview("");
    } catch (error) {
      console.error("Error Update Reviews", error);
    }
  };

  const handlePress = async (userId) => {
    // Check if the user has already liked the post
    const newpost = info;
    const isLiked = newpost.likeByUsers && newpost.likeByUsers.includes(userId);

    if (isLiked) {
      // Unlike the post
      newpost.likes -= 1;
      // Remove userId from likeByUsers array
      newpost.likeByUsers = newpost.likeByUsers.filter((id) => id !== userId);
      heart = "grey";
    } else {
      // Like the post
      newpost.likes += 1;
      // Add userId to likeByUsers array
      newpost.likeByUsers.push(userId);
      heart = "pink";
    }

    // Update state variables
    setHeartColor(heart);
    setInfo(newpost);
    await updateSharing(newpost);
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.containerStyle}>
        <View style={{ height: "auto" }}>
          {info.imageUrl && (
            <Image
              source={{ uri: info.imageUrl }}
              style={{ width: 350, height: 350 }}
            />
          )}
          <List.Section>
            <List.Subheader style={styles.text}>{info.title}</List.Subheader>
            <List.Item title={info.content} />
          </List.Section>
        </View>
        <View style={styles.likes}>
          <IconButton
            icon="heart"
            size={20}
            onPress={() => handlePress(userId)}
            iconColor={heartColor}
          />
          <Text>{info.likes}</Text>
        </View>

        <View style={styles.reviewInput}>
          <TextInput
            label="Write your comments"
            value={review}
            onChangeText={(text) => setReview(text)}
            mode="outlined(disabled)"
            style={{ width: "70%" }}
          />
          <Button onPress={handleAdd} mode="outlined">
            <Text>Add</Text>
          </Button>
        </View>

        <List.Section style={styles.reviewLayout}>
          <List.Subheader style={styles.reviews}>
            {info.reviews.length} Comments
          </List.Subheader>
          {info.reviews.map((item, index) => (
            <List.Item
              key={index}
              title={item.userId}
              description={item.content}
            />
          ))}
        </List.Section>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingBottom: "10%",
    paddingTop: "10%",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headTitle: {
    height: "20%",
    width: "100%",
    backgroundColor: "#FFC0CB",
    mixBlendMode: "multiply",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "5%",
  },
  text: {
    fontSize: 26,
  },
  input: {
    height: 80,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  reviewInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    gap: "10%",
  },
  reviews: {
    textAlign: "center",
    fontSize: 12,
  },
  reviewLayout: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "auto",
  },
  likes: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default PostDetail;
