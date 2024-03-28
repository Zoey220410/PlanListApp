import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  let tagColor;
  switch (props.tag) {
    case "Study":
      tagColor = "rgba(172, 213, 243, 0.45)";
      break;
    case "Work":
      tagColor = "#A6D6A5";
      break;
    case "Entertainment":
      tagColor = "#FFB6C1";
      break;
    case "Life":
      tagColor = "#FFFF90";
      break;
    default:
      tagColor = "#FFF";
  }

  return (
    <View style={(styles.item, { backgroundColor: tagColor })}>
      <View style={styles.square}>
        <Text
          style={
            (styles.itemText,
            { fontSize: 24, color: "#009", fontWeight: "bold" })
          }
        >
          {props.plan}
        </Text>
        <Text style={styles.itemText}>
          {props.startTime}-{props.endTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    width: "80%",
    height: "auto",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  square: {
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    flexDirection: "column",
  },
  itemText: {
    maxWidth: "100%",
    fontSize: 18,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
