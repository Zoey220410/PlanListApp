import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  ScrollView,
} from "react-native";
import { TextInput, List, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { updateSharing } from "../../firebase-backend/post-db";

const PostDetail = () => {
  const userId = "1";
  const route = useRoute();
  const { postInfo } = route.params;
  const [review, setReview] = useState("");
  console.log(postInfo);

  const handleAdd = async () => {
    if (review.trim() === "") return;
    try {
      const newpost = postInfo;
      const reviewInfo = { content: review, userId: userId };
      newpost.reviews.push(reviewInfo);
      console.log(newpost);
      await updateSharing(newpost);
      setReview("");
    } catch (error) {
      console.error("Error Update Reviews", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.containerStyle}>
        <View style={{ height: "auto" }}>
          {postInfo.imageUrl && (
            <Image
              source={{ uri: postInfo.imageUrl }}
              style={{ width: 350, height: 350 }}
            />
          )}
          <List.Section>
            <List.Subheader style={styles.text}>
              {postInfo.title}
            </List.Subheader>
            <List.Item title={postInfo.content} />
          </List.Section>
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
            {postInfo.reviews.length} Comments
          </List.Subheader>
          {postInfo.reviews.map((item, index) => (
            <List.Item
              key={index}
              title={item.userId}
              description={item.content}
            />
          ))}
        </List.Section>
      </View>
    </ScrollView>
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
});

export default PostDetail;
