import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { List, Button } from "react-native-paper";

const FriendActivity = ({ visible, onClose }) => {
  const [rankings, setRankings] = useState([]);
  useEffect(() => {
    const getRankings = async () => {
      try {
        const response = await fetch(
          "http://110.41.7.179:443/api/friend/scoreboard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token:
                "dbea3e79cd7c84a3b96ece091712205e7b64e56a8de33b5106511d3b55f601af",
            },
          }
        );
        const data = await response.json();
        setRankings(data.rankings);
      } catch (error) {
        console.error("Error fetching friends score:", error);
      }
    };

    getRankings();
  }, []);

  // let friends = [
  //   { name: "Ab", score: 5 },
  //   { name: "Ah", score: 25 },
  // ];
  let friends = rankings.sort((a, b) => {
    return parseInt(b.score) - parseInt(a.score);
  });

  const friendItems = friends.map((element, index) => {
    console.log("hi");
    console.log(element);
    return (
      <List.Item
        key={index}
        title={
          <View style={styles.column}>
            <Text style={styles.textList}>a</Text>
            <Text style={styles.textList}>Score: {element.score}</Text>
          </View>
        }
      />
    );
  });

  const renderItem = ({ item, index }) => (
    <View style={(styles.column, { flexDirection: "row" })}>
      <Text style={styles.textList}>{index + 1}. Amy</Text>
      <Text style={styles.textList}>Score: {item.score}</Text>
    </View>
  );

  console.log(friendItems);
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      contentContainerStyle={styles.containerStyle}
    >
      <View
        style={{
          ...styles.containerStyle,
          marginTop: "15%",
        }}
      >
        <Text style={{ fontSize: 25, margin: "5%", fontWeight: "bold" }}>
          Forest LeaderBoard
        </Text>
        <FlatList
          data={friends}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ flex: 0.8 }}
        />
        <Button onPress={onClose} mode="outlined">
          <Text>Back</Text>
        </Button>
      </View>

      {/* <ScrollView style={{ ...styles.containerStyle, marginTop: "15%" }}>
        <List.Section>
          <List.Subheader style={styles.text}>
            Forest Leader Board
          </List.Subheader>
          {friendItems}
        </List.Section>
        <Button onPress={onClose} mode="outlined">
          <Text>Back</Text>
        </Button>
      </ScrollView> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
    width: "100%",
    height: "90%",

    backgroundColor:
      "linear-gradient(180.03deg, rgba(233, 229, 141, 0.32) 0.02%, rgba(233, 229, 141, 0.289638) 24.32%, rgba(233, 229, 141, 0.192721) 47.3%, rgba(233, 229, 141, 0.0928) 70.99%)",
  },
  text: { fontSize: 30, fontWeight: "bold" },
  textList: { flex: 0.5, fontSize: 24 },
  column: {
    flexDirection: "column",
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default FriendActivity;
