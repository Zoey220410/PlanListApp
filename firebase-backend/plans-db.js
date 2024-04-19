import { db } from "../App";
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { createRecyclePlans } from "./recyclePlans-db";
export const createPlan = async (data) => {
  const todosCollectionRef = collection(db, "todos");
  await addDoc(todosCollectionRef, {
    data,
  }).then((result) => {
    planId = result.id;
  });

  return planId;
};

export const getPlans = async (userId) => {
  const result = [];

  const todosCollectionRef = collection(db, "todos");

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

  const isBeforeDay = (parsedDateA, parsedDateB) => {
    if (!parsedDateA || !parsedDateB) {
      return false;
    }

    const yearA = parsedDateA.getFullYear();
    const monthA = parsedDateA.getMonth();
    const dayA = parsedDateA.getDate();

    const yearB = parsedDateB.getFullYear();
    const monthB = parsedDateB.getMonth();
    const dayB = parsedDateB.getDate();

    const startOfDayA = new Date(yearA, monthA, dayA);
    const startOfDayB = new Date(yearB, monthB, dayB);

    return startOfDayA.getTime() < startOfDayB.getTime();
  };

  const filteredTodos = [];

  for (const todo of result) {
    planDate = todo.endDate;
    const currentDate = new Date();

    if (isBeforeDay(planDate, currentDate)) {
      await createRecyclePlans(todo.data);
      await deleteTodo(todo.id);
    } else {
      filteredTodos.push(todo);
    }
  }

  filteredTodos.sort((a, b) => {
    if (
      !a.startDate ||
      !b.startDate ||
      !(a.startDate instanceof Date) ||
      !(b.startDate instanceof Date)
    ) {
      return 0;
    }

    return a.startDate - b.startDate;
  });

  return filteredTodos;
};

// export const updateTodo = async (todoId, data) => {
//   const todoRef = doc(db, "users", userId, "todos", todoId);

//   await updateDoc(todoRef, data).then(() => {
//     console.log("Todo updated");
//   });
// };

export const deleteTodo = async (todoId) => {
  const todoRef = doc(db, "todos", todoId);

  await deleteDoc(todoRef).then(() => {
    console.log("Todo deleted");
  });
};
