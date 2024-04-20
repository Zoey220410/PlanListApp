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
  const todosCollectionRef = collection(db, "events");
  await addDoc(todosCollectionRef, {
    data,
  }).then((result) => {
    eventId = result.id;
  });

  return eventId;
};

export const getEvents = async (userId) => {
  const result = [];

  const eventsCollectionRef = collection(db, "events");

  try {
    await getDocs(eventsCollectionRef).then((events) => {
      if (events.empty) return; // If no posts found, return early

      const filteredPosts = posts.docs.filter(
        (post) => post.data().userId === userId
      );

      filteredPosts.forEach((event) => {
        result.push({
          id: event.id,
          ...event.data(),
        });
      });
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
  return result;
};
