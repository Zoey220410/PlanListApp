import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  View,
  ScrollView,
  FlatList,
  Switch,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput, List, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, addDoc } from "firebase/firestore";

const Post = ({ visible, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    console.log("Title:", title);
    console.log("Content:", content);

    await addDoc(collection(db, "plans"), {
      title: title,
      content: content,
    });

    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      // transparent={true}
    >
      <View style={styles.containerStyle}>
        <View style={styles.headTitle}>
          <Text style={styles.text}>Create your plan</Text>
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
    backgroundColor: "rgba(172, 213, 243, 0.45)",
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
