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
import ReTask from "../../components/ReTask";
import RePlan from "../../components/RePlan";
import {
  deleteRecycle,
  getRecyclePlans,
} from "../../firebase-backend/recyclePlans-db";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [bin, setBin] = useState([]);
  const [newplan, setNewplan] = useState("");
  const [reAddId, setReAddId] = useState(null);

  useEffect(() => {
    getRePlans();
  }, []);

  useEffect(() => {
    getRePlans();
  }, [modalVisible]);

  const userId = "1";

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
    await deleteRecycle(userId, id);
    await getRePlans();
  };

  const handleReAdd = (id) => {
    setModalVisible(true);
    setReAddId(id);
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
              startTime={item.data.startTime}
              endTime={item.data.endTime}
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
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 0.8 }}
      >
        <View>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
      {/* {bin.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setModalVisible(true);
                    setNewplan(item.plan);
                    console.log(item.plan);
                  }}
                >
                  <ReTask
                    plan={item.data.plan}
                    startTime={item.data.startTime}
                    endTime={item.data.endTime}
                    tag={item.data.tag}
                    alarmReminder={item.data.alarmReminder}
                    planId={item.id}
                    onDelete={handleDelete}
                    onReAdd={handleReAdd}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View> */}
      {/* </ScrollView> */}
      <View>
        <RePlan
          newplan={newplan}
          visible={modalVisible}
          onClose={handleModalClose}
          reAddId={reAddId}
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
