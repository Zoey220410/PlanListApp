import { db } from "../App";
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const createRecyclePlans = async (data) => {
  const todosCollectionRef = collection(db, "bin");
  await addDoc(todosCollectionRef, {
    data,
  }).then((result) => {
    planId = result.id;
  });

  return planId;
};

export const getRecyclePlans = async (userId) => {
  const result = [];

  const todosCollectionRef = collection(db, "bin");

  await getDocs(todosCollectionRef).then((todos) => {
    if (todos.empty) return; // If no posts found, return early

    const filtered = todos.docs.filter((todo) => {
      return todo.data().data.userId === userId;
    });

    filtered.forEach((todo) => {
      result.push({
        id: todo.id,
        ...todo.data(),
      });
    });
  });

  result.forEach((item) => {
    const startDate = new Date(item.data.startTime.seconds * 1000);
    const endDate = new Date(item.data.endTime.seconds * 1000);
    item.startDate = startDate;
    item.endDate = endDate;
  });

  result.sort((a, b) => {
    if (
      !a.startDate ||
      !b.startDate ||
      !(a.startDate instanceof Date) ||
      !(b.startDate instanceof Date)
    ) {
      return 0;
    }

    return b.startDate - a.startDate;
  });

  return result;
};

export const deleteRecycle = async (todoId) => {
  console.log(todoId);
  const todoRef = doc(db, "bin", todoId);

  await deleteDoc(todoRef).then(() => {
    console.log("Recycle plan deleted");
  });
};
