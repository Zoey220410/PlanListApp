import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ReTask from "../../components/ReTask";
import RePlan from "../../components/RePlan";
import {
  deleteRecycle,
  getRecyclePlans,
} from "../../firebase-backend/recyclePlans-db";
import { useFocusEffect } from "@react-navigation/native";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";

export default function BinScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [bin, setBin] = useState([]);
  const [newPlan, setNewPlan] = useState(null);
  const [tag, setTag] = useState(null);
  const [alarmReminder, setAlarmReminder] = useState(null);
  const [reAddId, setReAddId] = useState(null);
  // const [userId, setUserId] = useState("");
  const { user, setUser, userAvatarUrl, setUserAvatarUrl } = useContext(
    AuthenticatedUserContext
  );

  const userId = user ? user.uid : "";

  useFocusEffect(
    React.useCallback(() => {
      getRePlans();
    }, [])
  );

  useEffect(() => {
    getRePlans();
  }, [modalVisible]);

  // useEffect(() => {
  //   setUserId(user ? user.uid : "");
  //   getRePlans();
  // }, []);

  const getRePlans = async () => {
    try {
      const binPlans = await getRecyclePlans(userId);
      setBin(binPlans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      alert("Failed to fetch plans");
    }
  };

  const handleDelete = async (id) => {
    await deleteRecycle(id);
    await getRePlans();
  };

  const handleReAdd = (id) => {
    console.log("hi");
    setReAddId(id);
    const readdPlan = bin.find((item) => {
      return item.id === id;
    });
    if (readdPlan) {
      setNewPlan(readdPlan.data.plan);
    } else {
      console.log("No plan found with ID:", id);
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headTitle}>
        <Text style={styles.text}>Find Back Your Plans</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        persistentScrollbar={true}
        style={{ flex: 0.8 }}
      >
        {/* <View style={styles.items}> */}
        {/* This is where the tasks will go! */}
        {bin.map((item, index) => {
          return (
            <ReTask
              key={item.id}
              plan={item.data.plan}
              startTime={new Date(
                item.data.startTime.seconds * 1000
              ).toLocaleString()}
              endTime={new Date(
                item.data.endTime.seconds * 1000
              ).toLocaleString()}
              tag={item.data.tag}
              alarmReminder={item.data.alarmReminder}
              planId={item.id}
              onDelete={handleDelete}
              onReAdd={handleReAdd}
            />
          );
        })}
        {/* </View> */}
      </ScrollView>
      <View>
        <RePlan
          visible={modalVisible}
          onClose={handleModalClose}
          reAddId={reAddId}
          newplan={newPlan}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  headTitle: {
    flex: 0.2,
    backgroundColor: "#A6D6A5",
    mixBlendMode: "multiply",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "5%",
    marginBottom: "5%",
  },
  text: {
    color: "black",
    fontSize: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    margin: "2%",
  },
  addText: {
    fontSize: 26,
  },
});
