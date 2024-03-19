import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import FriendActivity from "../../components/FriendActivity";

const Garden = () => {
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [score, setScore] = useState(0);

  //const [isPressed, setIsPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setScreenHeight(window.height);
      setScreenWidth(window.width);
    };

    Dimensions.addEventListener("change", handleDimensionsChange);

    const getScore = async () => {
      try {
        const response = await fetch(
          "http://110.41.7.179:443/api/plan/get-score",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token:
                "dbea3e79cd7c84a3b96ece091712205e7b64e56a8de33b5106511d3b55f601af", // 如果有 token 的话
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setScore(data.score);
      } catch (error) {
        console.log("Error in fetching score:", error);
      }
    };

    getScore();
  }, []);

  const calculatePercentageHeight = (percentage) => {
    return (screenHeight * percentage) / 100;
  };
  const calculatePercentageWidth = (percentage) => {
    return (screenWidth * percentage) / 100;
  };

  const scoreImageMappings = {
    1: require("../../images/tree/1.png"),
    2: require("../../images/tree/2.png"),
    3: require("../../images/tree/3.png"),
    4: require("../../images/tree/4.png"),
    5: require("../../images/tree/5.png"),
  };
  const imageNumber = Math.min(5, Math.ceil(score / 100));
  const treeImage = scoreImageMappings[imageNumber];

  return (
    <View style={styles.screen}>
      <View style={styles.headTitle}>
        <Text style={styles.text}>Garden</Text>
        <Button
          mode="outlined"
          style={styles.btnScore}
          labelStyle={styles.btnLabelScore}
          // onPress={() => {
          //   setScore(parseInt(score) + 50);
          // }}
        >
          Your Score: {score}
        </Button>
      </View>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/background.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.items}>
            <View
              style={{
                width: "100%",
                height: "35%",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                mode="contained"
                style={{
                  backgroundColor: "#A6D6A5",
                  width: "50%",
                  height: "30%",
                  margin: "3%",
                }}
                labelStyle={styles.btnLabel}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                Friends' Activity
              </Button>
            </View>
            <View style={styles.imageBox}>
              <Image
                source={treeImage}
                resizeMode="contain"
                style={{
                  ...styles.treeImage,
                }}
              />
            </View>
          </View>
          <FriendActivity visible={modalVisible} onClose={handleModalClose} />
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  headTitle: {
    flex: 0.2,
    backgroundColor: "rgba(166, 214, 165, 0.45)",
    mixBlendMode: "multiply",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "5%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 0.8,
  },
  text: {
    color: "black",
    fontSize: 36,
  },
  // btnFriend: {
  //   margin: "3%",
  //   width: "40%",
  //   height: "30%",
  //   backgroundColor: "#A6D6A5",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: 0,
  //   borderWidth: 0,
  // },
  btnLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  treeImage: {
    flex: 1,
    // width: '50%',
    // height: '50%',
  },
  btnScore: {
    backgroundColor: "white",
    width: "auto",
    height: "30%",
    marginTop: "20%",
    marginRight: "3%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    borderWidth: 0,
  },
  btnLabelScore: {
    fontSize: 18,
    fontWeight: "bold",
  },
  items: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "80%",
    width: "100%",
  },
  imageBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "80%",
  },
});

export default Garden;
