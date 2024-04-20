import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
// import PushNotification from "react-native-push-notification";
import Task from "../../components/Task";
import Plan from "../../components/Plan";
import { getPlans } from "../../firebase-backend/plans-db";
import { deleteTodo } from "../../firebase-backend/plans-db";
import { Button } from "react-native-paper";
import { createRecyclePlans } from "../../firebase-backend/recyclePlans-db";
import { useFocusEffect } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { getWeather } from "../../firebase-backend/weatherController";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";
import * as Location from "expo-location";
import { createEvent } from "../../firebase-backend/analyticsController";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(startDate, plan, tag, alarmReminder) {
  if (startDate < new Date() || !alarmReminder) return;
  time = startDate.getTime() - new Date().getTime();

  const message = {
    sound: "default",
    title: tag,
    body: plan,
    data: { someData: "goes here" },
  };

  let receiptID = await Notifications.scheduleNotificationAsync({
    content: {
      to: "",
      title: message.title,
      body: message.body,
    },
    trigger: { seconds: time / 1000 },
  });
}

export default function PlanScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [plans, setPlans] = useState([]);
  const [activeButton, setActiveButton] = useState(0);
  const [choice, setChoice] = useState("All");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(null);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [screenStartTime, setScreenStartTime] = useState(0);
  const notificationListener = useRef();
  const responseListener = useRef();
  // const [userId, setUserId] = useState("");

  const { user, setUser, userAvatarUrl, setUserAvatarUrl } = useContext(
    AuthenticatedUserContext
  );
  const userId = user ? user.uid : "";
  console.log(userId);

  useFocusEffect(
    React.useCallback(() => {
      let screenStartTime = Date.now();
      const fetchData = async () => {
        try {
          await getTodos();
          setScreenStartTime(Date.now());
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };

      fetchData();

      return async () => {
        const timeSpent = Date.now() - screenStartTime;
        console.log(timeSpent);
        try {
          await createEvent({
            user: userId,
            screen: "Main",
            Plantime: timeSpent,
          });
        } catch (error) {
          console.error("Error creating event:", error);
        }
      };
    }, [])
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (location === null) return;
        const weatherData = await getWeather(
          location.coords.latitude,
          location.coords.longitude
        );
        setWeather(weatherData.main.temp);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, [location]);

  useEffect(async () => {
    await getTodos();
  }, [modalVisible, choice]);

  const getTodos = async () => {
    try {
      console.log(userId);
      const todos = await getPlans(userId);
      console.log(todos);
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

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    plans.map((item) => {
      sendPushNotification(
        item.startDate,
        item.data.plan,
        item.data.tag,
        item.data.alarmReminder
      );
    });
  }, [plans]);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    await getTodos();
  };

  const handleTranfer = async (id) => {
    const deletedPlan = plans.filter((plan) => {
      return plan.id === id;
    });
    console.log(deletedPlan);

    await createRecyclePlans(deletedPlan[0].data);
    await deleteTodo(id);
    await getTodos();
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSelect = (buttonId) => {
    const tags = ["All", "Work", "Study", "Entertainment", "Life", "Other"];
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

      <Text>
        Temperature:{" "}
        {location
          ? Math.round(((weather - 273.15) * 9) / 5 + 32)
          : "Waiting for location..."}
      </Text>

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
    gap: "5%",
    margin: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
});
