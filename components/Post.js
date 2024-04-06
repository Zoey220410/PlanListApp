import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Modal, View, Image } from "react-native";
import { TextInput, List, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { createSharing } from "../firebase-backend/post-db";

const Post = ({ visible, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const userId = "1";

  const handleSubmit = async () => {
    try {
      data = {
        title: title,
        content: content,
        postTime: new Date(),
        likes: 0,
        reviews: [],
        userId: userId,
        likeByUsers: [],
      };

      const postId = await createSharing(userId, data, image);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.containerStyle}>
        <View style={styles.headTitle}>
          <Text style={styles.text}>Create Your Post</Text>
        </View>
        <TextInput
          style={styles.input}
          label="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          label="Content"
          value={content}
          onChangeText={setContent}
        />
        <Button onPress={pickImage} mode="contained">
          <Text>Choose Image</Text>
        </Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <View
          style={{
            width: "50%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button onPress={handleSubmit} mode="outlined">
            <Text>Submit</Text>
          </Button>
          <Button onPress={onClose} mode="outlined">
            <Text>Back</Text>
          </Button>
        </View>
      </View>
    </Modal>
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: "10%",
  },
});

export default Post;
