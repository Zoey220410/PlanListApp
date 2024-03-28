import React, { useEffect, useState } from "react";
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
import Task from "../../components/task";
import RePlan from "../../components/RePlan";
import db from "../../App";
import { doc, getDoc } from "firebase/firestore";

let testData = [
  {
    plan: "Pre",
    startTime: "3/21/2024, 22:36:47",
    endTime: "3/21/2024, 22:36:47",
    tag: "Work",
    alarmReminder: true,
  },
  {
    plan: "Moudule 1",
    startTime: "3/25/2024, 22:36:47",
    endTime: "3/25/2024, 22:36:47",
    tag: "Study",
    alarmReminder: true,
  },
];

export default function BinScreen() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [plans, setPlans] = useState(null);
  const [newplan, setNewplan] = useState("");

  // useEffect(() => {
  //   getPlans();
  //   console.log(plans);
  // }, []);

  const getPlans = async () => {
    try {
      planCollection = doc(db, "plans");
      plans = await getDoc(planCollection);

      const filteredPlans = response.data.filter((league) => {
        console.log(league);
      });

      setPlans(filteredPlans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      alert("Failed to fetch plans");
    }
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
    fetch("http://110.41.7.179:443/api/plan/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token:
          "dbea3e79cd7c84a3b96ece091712205e7b64e56a8de33b5106511d3b55f601af",
      },
      body: JSON.stringify({
        text: task,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
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
        style={{ flex: 0.8 }}
      >
        <View>
          <View style={styles.items} onPress={() => completeTask(index)}>
            {/* This is where the tasks will go! */}
            {testData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setModalVisible(true);
                    setNewplan(item.plan);
                    console.log(item.plan);
                  }}
                >
                  <Task
                    plan={item.plan}
                    startTime={item.startTime}
                    endTime={item.endTime}
                    tag={item.tag}
                    alarmReminder={item.alarmReminder}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View>
        <RePlan
          newplan={newplan}
          visible={modalVisible}
          onClose={handleModalClose}
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
    marginTop: 30,
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
