import React, { useState, useEffect, useContext } from "react";
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
import { createPlan } from "../firebase-backend/plans-db";
import { deleteRecycle } from "../firebase-backend/recyclePlans-db";
import { AuthenticatedUserContext } from "../Context/AuthenticationContext";

const RePlan = ({ visible, onClose, reAddId, newplan }) => {
  const [plan, setPlan] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [alarmReminder, setAlarmReminder] = useState(false);
  const [tag, setTag] = useState("other");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [activeButton, setActiveButton] = useState(0);
  const { user, setUser, userAvatarUrl, setUserAvatarUrl } = useContext(
    AuthenticatedUserContext
  );
  const userId = user ? user.uid : "";

  useEffect(() => {
    setPlan(newplan);
  }, [newplan]);

  const handleButtonPress = (buttonId) => {
    const tags = ["Work", "Study", "Entertainment", "Life", "Other"];
    setActiveButton(buttonId);
    setTag(tags[buttonId - 1]);
  };

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

  const handleSubmit = async () => {
    try {
      data = {
        plan: plan,
        startTime: startTime,
        endTime: endTime,
        alarmReminder: alarmReminder,
        tag: tag,
        userId: userId,
      };

      await createPlan(data);
      await deleteRecycle(reAddId);

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.containerStyle}>
        <View style={styles.headTitle}>
          <Text style={styles.text}>Renew your plan</Text>
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
              onChange={onChange1}
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

        {/* <TextInput
          style={styles.input}
          label="Tag"
          value={tag}
          onChangeText={setTag}
        /> */}
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => handleButtonPress(1)}
            disabled={activeButton === 1}
          >
            <Text>Work</Text>
          </Button>
          <Button
            onPress={() => handleButtonPress(2)}
            disabled={activeButton === 2}
          >
            <Text>Study</Text>
          </Button>
          <Button
            onPress={() => handleButtonPress(3)}
            disabled={activeButton === 3}
          >
            <Text>Entertainment</Text>
          </Button>
          <Button
            onPress={() => handleButtonPress(4)}
            disabled={activeButton === 4}
          >
            <Text>Life</Text>
          </Button>
          <Button
            onPress={() => handleButtonPress(5)}
            disabled={activeButton === 5}
          >
            <Text>Other</Text>
          </Button>
        </View>
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

export default RePlan;
