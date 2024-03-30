import { db } from "../App";
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const createPost = async (userId, data) => {
  const todosCollectionRef = collection(db, "users", userId, "posts");
  await addDoc(todosCollectionRef, {
    data,
  }).then((result) => {
    planId = result.id;
  });

  return planId;
};

export const getPost = async (userId) => {
  const result = [];

  const postsCollectionRef = collection(db, "users", userId, "posts");

  await getDocs(postsCollectionRef).then((posts) =>
    posts.forEach((post) => {
      result.push({
        id: post.id,
        ...post.data(),
      });
    })
  );

  const filteredPosts = [];

  filteredTodos.sort((a, b) => {
    if (
      !a.postTime ||
      !b.postTime ||
      typeof a.postTime !== "string" ||
      typeof b.postTime !== "string"
    ) {
      return 0;
    }
    const postTimeA = convertDate(a.postTime).getTime();
    const postTimeB = convertDate(b.postTime).getTime();

    return postTimeA - postTimeB;
  });

  return filteredPosts;
};
