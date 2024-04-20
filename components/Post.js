import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Modal, View, Image, ScrollView } from "react-native";
import { TextInput, List, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { createSharing } from "../firebase-backend/post-db";
import { AuthenticatedUserContext } from "../Context/AuthenticationContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Post = ({ visible, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [activeButton, setActiveButton] = useState(0);
  const [privacy, setPrivacy] = useState(null);

  const { user, setUser, userAvatarUrl, setUserAvatarUrl } = useContext(
    AuthenticatedUserContext
  );
  const userId = user ? user.uid : "";

  const handleSubmit = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }
    if (content.trim() == "" || title.trim() == "") {
      alert("Invalid Input.");
      return;
    }
    if (privacy == null) {
      alert("Choose post visiability.");
      return;
    }
    try {
      data = {
        title: title,
        content: content,
        privacy: privacy,
        postTime: new Date(),
        likes: 0,
        reviews: [],
        userId: userId,
        likeByUsers: [],
      };

      const postId = await createSharing(userId, data, image);
      setContent("");
      setTitle("");
      setImage("");
      setPrivacy(null);
      setActiveButton(0);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setContent("");
    setTitle("");
    setImage("");
    setActiveButton(0);
    setPrivacy(null);
    setActiveButton(0);
    onClose();
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

  const handleButtonPress = (buttonId) => {
    const privacy = ["Private", "Public"];
    setActiveButton(buttonId);
    setPrivacy(privacy[buttonId - 1]);
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.containerStyle}>
          <View style={styles.headTitle}>
            <Text style={styles.text}>Create Your Post</Text>
          </View>
          <View
            style={{
              width: "50%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              mode="contained"
              onPress={() => handleButtonPress(1)}
              disabled={activeButton === 1}
            >
              <Text>Private</Text>
            </Button>
            <Button
              mode="contained"
              onPress={() => handleButtonPress(2)}
              disabled={activeButton === 2}
            >
              <Text>Public</Text>
            </Button>
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
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
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
            <Button onPress={handleClose} mode="outlined">
              <Text>Back</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    gap: "40%",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  headTitle: {
    height: 200,
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
