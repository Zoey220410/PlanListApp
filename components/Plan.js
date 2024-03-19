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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput, List, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const Plan = ({ visible, onClose }) => {
  const [plan, setPlan] = useState("");
  const [planDate, setPlanDate] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [alarmReminder, setAlarmReminder] = useState(false);
  const [tag, setTag] = useState("");
  const [importanceLevel, setImportanceLevel] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setStartTime(currentDate);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setEndTime(currentDate);
  };

  const handleSubmit = () => {
    // 在这里可以将表单数据提交到后端保存到数据库
    console.log("Plan:", plan);
    console.log("Plan Date:", planDate);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Alarm Reminder:", alarmReminder);
    console.log("Tag:", tag);
    console.log("Importance Level:", importanceLevel);
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
          label="Plan"
          value={plan}
          onChangeText={setPlan}
        />

        <SafeAreaView>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Start Time: </Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={startTime}
              mode={"date"}
              is24Hour={true}
              onChange={onChange1}
            />
            <DateTimePicker
              testID="dateTimePicker"
              value={startTime}
              mode={"time"}
              is24Hour={true}
              onChange={onChange2}
            />
          </View>
        </SafeAreaView>

        <SafeAreaView>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>End Time: </Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={endTime}
              mode={"date"}
              is24Hour={true}
              onChange={onChange2}
            />
            <DateTimePicker
              testID="dateTimePicker"
              value={endTime}
              mode={"time"}
              is24Hour={true}
              onChange={onChange2}
            />
          </View>
        </SafeAreaView>

        <TextInput
          style={styles.input}
          label="Tag"
          value={tag}
          onChangeText={setTag}
        />
        <View style={styles.switchContainer}>
          <Text>Alarm Reminder:</Text>
          <Switch value={alarmReminder} onValueChange={setAlarmReminder} />
        </View>

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

export default Plan;
