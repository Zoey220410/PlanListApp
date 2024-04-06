import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Modal, View, Image } from "react-native";
import { TextInput, List, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const PostDetail = () => {
  const userId = "1";
  const route = useRoute();
  const { postInfo } = route.params;
  console.log(postInfo);

  const navigation = useNavigation();
  const onClose = () => {
    navigation.navigate("discoverScreen"); // navigate to OtherScreen
  };

  return (
    <View style={styles.containerStyle}>
      <View style={{ flex: 0.5 }}>
        {postInfo.imageUrl && (
          <Image
            source={{ uri: postInfo.imageUrl }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Text>{postInfo.title}</Text>
        <Text>{postInfo.content}</Text>
      </View>
    </View>
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

export default PostDetail;
