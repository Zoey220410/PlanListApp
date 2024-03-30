import { db } from "../App";
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const createRecyclePlans = async (userId, data) => {
  const todosCollectionRef = collection(db, "users", userId, "bin");
  await addDoc(todosCollectionRef, {
    data,
  }).then((result) => {
    planId = result.id;
  });

  return planId;
};

export const getRecyclePlans = async (userId) => {
  const result = [];

  const todosCollectionRef = collection(db, "users", userId, "bin");

  await getDocs(todosCollectionRef).then((todos) =>
    todos.forEach((todo) => {
      result.push({
        id: todo.id,
        ...todo.data(),
      });
    })
  );

  const convertDate = (dateString) => {
    const sides = dateString.split(",");
    dateString = sides[0];
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const month = parseInt(parts[0], 10) - 1;
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    } else {
      return null;
    }
  };

  result.sort((a, b) => {
    if (
      !a.startTime ||
      !b.startTime ||
      typeof a.startTime !== "string" ||
      typeof b.startTime !== "string"
    ) {
      return 0;
    }
    const startTimeA = convertDate(a.startTime).getTime();
    const startTimeB = convertDate(b.startTime).getTime();

    return startTimeA - startTimeB;
  });

  return result;
};

export const deleteRecycle = async (userId, todoId) => {
  console.log(todoId);
  const todoRef = doc(db, "users", userId, "bin", todoId);

  await deleteDoc(todoRef).then(() => {
    console.log("Recycle plan deleted");
  });
};
