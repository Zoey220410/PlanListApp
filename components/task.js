import React, { useState } from "react";
import { View, Text, StyleSheet, Card } from "react-native";
import Swipeout from "react-native-swipeout";

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

  const [swipeBtns, setSwipeBtns] = useState([
    {
      text: "Done",
      color: "green",
      onPress: () => props.onDelete(props.planId),
    },
    {
      text: "Delete",
      color: "red",
      onPress: () => props.onDeleteTransfer(props.planId),
    },
  ]);

  return (
    <Swipeout
      right={swipeBtns}
      autoClose={true}
      style={{ ...styles.item, backgroundColor: tagColor }}
    >
      <View>
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
          <Text>{props.tag}</Text>
        </View>
      </View>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    width: "100%",
    height: "auto",
    elevation: 3,
    marginBottom: "2%",
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
