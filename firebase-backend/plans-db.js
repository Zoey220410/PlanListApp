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

export const createPlan = async (userId, data) => {
  const todosCollectionRef = collection(db, "users", userId, "todos");
  await addDoc(todosCollectionRef, {
    data,
  }).then((result) => {
    planId = result.id;
  });

  return planId;
};

export const getPlans = async (userId) => {
  const result = [];

  const todosCollectionRef = collection(db, "users", userId, "todos");

  await getDocs(todosCollectionRef).then((todos) =>
    todos.forEach((todo) => {
      result.push({
        id: todo.id,
        ...todo.data(),
      });
    })
  );

  const convertDay = (dateString) => {
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

  const convertDate = (dateTimeString) => {
    const sides = dateTimeString.split(",");
    const datePart = sides[0];
    const timePart = sides[1];

    const dateParts = datePart.split("/");
    const timeParts = timePart.split(":");

    if (dateParts.length === 3 && timeParts.length === 3) {
      const month = parseInt(dateParts[0], 10) - 1;
      const day = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);

      const hour = parseInt(timeParts[0], 10);
      const minute = parseInt(timeParts[1], 10);
      const second = parseInt(timeParts[2], 10);

      return new Date(year, month, day, hour, minute, second);
    } else {
      return null;
    }
  };

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
    planDate = convertDay(todo.data.endTime);
    const currentDate = new Date();

    if (isBeforeDay(planDate, currentDate)) {
      await createRecyclePlans(userId, todo.data);
      await deleteTodo(userId, todo.id);
    } else {
      filteredTodos.push(todo);
    }
  }

  filteredTodos.sort((a, b) => {
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

  return filteredTodos;
};

export const updateTodo = async (todoId, data) => {
  const todoRef = doc(db, "users", userId, "todos", todoId);

  await updateDoc(todoRef, data).then(() => {
    console.log("Todo updated");
  });
};

export const deleteTodo = async (userId, todoId) => {
  const todoRef = doc(db, "users", userId, "todos", todoId);

  await deleteDoc(todoRef).then(() => {
    console.log("Todo deleted");
  });
};
