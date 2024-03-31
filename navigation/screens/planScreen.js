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
  Clipboa,
} from "react-native";
import Task from "../../components/Task";
import Plan from "../../components/Plan";
import { getPlans } from "../../firebase-backend/plans-db";
import { deleteTodo } from "../../firebase-backend/plans-db";
import { Button } from "react-native-paper";
import { createRecyclePlans } from "../../firebase-backend/recyclePlans-db";
import { useFocusEffect } from "@react-navigation/native";

let testData = [
  {
    plan: "Meeting",
    startTime: "3/27/2024, 22:36:47",
    endTime: "3/27/2024, 22:36:47",
    tag: "Work",
    alarmReminder: true,
  },
  {
    plan: "HW",
    startTime: "3/27/2024, 22:36:47",
    endTime: "3/27/2024, 22:36:47",
    tag: "Study",
    alarmReminder: true,
  },
  {
    plan: "Market",
    startTime: "3/27/2024, 22:36:47",
    endTime: "3/27/2024, 22:36:47",
    tag: "Life",
    alarmReminder: true,
  },
];

export default function PlanScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [plans, setPlans] = useState([]);
  const [activeButton, setActiveButton] = useState(0);
  const [choice, setChoice] = useState("All");
  const userId = "1";

  useFocusEffect(
    React.useCallback(() => {
      getTodos();
    }, [])
  );

  useEffect(() => {
    getTodos();
  }, [modalVisible, choice]);

  const getTodos = async () => {
    try {
      const todos = await getPlans(userId);
      if (choice === "All") {
        setPlans(todos);
        return;
      }
      filteredPlans = todos.filter((plan) => {
        return plan.data.tag === choice;
      });
      setPlans(filteredPlans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      alert("Failed to fetch plans");
    }
  };

  const handleDelete = async (id) => {
    await deleteTodo(userId, id);
    await getTodos();
  };

  const handleTranfer = async (id) => {
    const deletedPlan = plans.filter((plan) => {
      return plan.id === id;
    });

    await createRecyclePlans(userId, deletedPlan[0].data);
    await deleteTodo(userId, id);
    await getTodos();
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSelect = (buttonId) => {
    const tags = ["All", "Study", "Work", "Entertainment", "Life", "Other"];
    setActiveButton(buttonId);
    setChoice(tags[buttonId]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headTitle}>
        <Text style={styles.text}>Plans Today</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.classify}>
        <Button
          onPress={() => {
            handleSelect(0);
          }}
          mode="outlined"
          disabled={activeButton === 0}
        >
          <Text>All</Text>
        </Button>
        <Button
          onPress={() => {
            handleSelect(1);
          }}
          mode="outlined"
          disabled={activeButton === 1}
        >
          <Text>Work</Text>
        </Button>
        <Button
          onPress={() => {
            handleSelect(2);
          }}
          mode="outlined"
          disabled={activeButton === 2}
        >
          <Text>Study</Text>
        </Button>
        <Button
          onPress={() => {
            handleSelect(3);
          }}
          mode="outlined"
          disabled={activeButton === 3}
        >
          <Text>Entertainment</Text>
        </Button>
        <Button
          onPress={() => {
            handleSelect(4);
          }}
          mode="outlined"
          disabled={activeButton === 4}
        >
          <Text>Life</Text>
        </Button>
        <Button
          onPress={() => {
            handleSelect(5);
          }}
          mode="outlined"
          disabled={activeButton === 5}
        >
          <Text>Other</Text>
        </Button>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        persistentScrollbar={true}
        style={{ flex: 0.6 }}
      >
        {/* <View style={styles.items}> */}
        {/* This is where the tasks will go! */}
        {plans.map((item, index) => {
          return (
            <Task
              key={item.id}
              plan={item.data.plan}
              startTime={item.data.startTime}
              endTime={item.data.endTime}
              tag={item.data.tag}
              alarmReminder={item.data.alarmReminder}
              planId={item.id}
              onDelete={handleDelete}
              onDeleteTransfer={handleTranfer}
            />
          );
        })}
        {/* </View> */}
      </ScrollView>

      <View>
        <Plan visible={modalVisible} onClose={handleModalClose} />
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
    backgroundColor: "rgba(172, 213, 243, 0.45)",
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
  classify: {
    flex: 0.2,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10%",
    margin: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});
