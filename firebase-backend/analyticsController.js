import { db } from "../App";
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const createEvent = async (data) => {
  if (data.user === "") return null;
  const todosCollectionRef = collection(db, "A_Test");
  console.log(data);
  try {
    await addDoc(todosCollectionRef, {
      data,
    }).then((result) => {
      eventId = result.id;
      console.log("success");
    });
  } catch (error) {
    console.log(error);
  }

  return eventId;
};

export const createTime = async (data) => {
  const timeCollectionRef = collection(db, "A_Test_Time");
  await addDoc(timeCollectionRef, {
    data,
  }).then((result) => {
    timeId = result.id;
  });

  return timeId;
};

export const getEvents = async (userId) => {
  console.log(userId);
  const eventsCollectionRef = collection(db, "A_Test");
  let result;

  try {
    await getDocs(eventsCollectionRef).then((events) => {
      if (events.empty) return; // If no events found, return early
      const mainT = events.docs.filter((el) => {
        return (
          el.data().data.user === userId && el.data().data.screen === "Main"
        );
      });
      console.log(mainT);

      const mainTime = mainT.reduce((total, el) => {
        return total + el.data().data.Plantime;
      }, 0);

      console.log(mainTime);

      const bin = events.docs.filter((el) => {
        return (
          el.data().data.user === userId && el.data().data.screen === "Recycle"
        );
      });

      const binTime = bin.reduce((total, el) => {
        return total + el.data().data.Plantime;
      }, 0);

      console.log(binTime);

      result = {
        Main: mainTime / (1000 * 60),
        Bin: binTime / (1000 * 60),
      };
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
  return result;
};
