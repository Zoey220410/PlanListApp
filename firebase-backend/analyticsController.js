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
  await addDoc(todosCollectionRef, {
    data,
  }).then((result) => {
    eventId = result.id;
  });

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
  const eventsCollectionRef = collection(db, "A_Test");
  let result;

  try {
    await getDocs(eventsCollectionRef).then((events) => {
      if (events.empty) return; // If no events found, return early
      const main = events.docs.filter((el) => {
        return (
          el.data().data.user === userId && el.data().data.screen === "Main"
        );
      });

      const mainTime = main.reduce((total, el) => {
        return total + el.data().data.Plantime;
      }, 0);

      const bin = events.docs.filter((el) => {
        return (
          el.data().data.user === userId && el.data().data.screen === "Recycle"
        );
      });

      const binTime = main.reduce((total, el) => {
        return total + el.data().data.Plantime;
      }, 0);

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
