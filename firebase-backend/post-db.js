import { db } from "../App";
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export const createSharing = async (userId, postData, imageUri) => {
  try {
    let downloadUrl = "";
    const imageName = postData.postTime;
    if (imageUri !== "") {
      const { downloadUrl: url } = await uploadToFirebase(imageUri, imageName);
      downloadUrl = url;
    }

    const postsCollectionRef = collection(db, "posts");
    const docRef = await addDoc(postsCollectionRef, {
      ...postData,
      imageUrl: downloadUrl,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

const uploadToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export const getSharing = async (userId) => {
  const result = [];
  if (userId === "") {
    return [];
  }

  const postsCollectionRef = collection(db, "posts");

  try {
    await getDocs(postsCollectionRef).then((posts) => {
      if (posts.empty) return; // If no posts found, return early

      let filteredPosts;
      console.log(userId);

      if (userId === "all") {
        filteredPosts = posts;
      } else {
        filteredPosts = posts.docs.filter(
          (post) => post.data().userId === userId
        );
      }

      let pid = "";

      filteredPosts.forEach((post) => {
        if (filteredPosts.length === 0) {
          pid = "1";
        } else {
          pid = post.id;
        }
        result.push({
          id: pid,
          ...post.data(),
        });
      });
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }

  result.sort((a, b) => {
    if (
      !a.postTime ||
      !b.postTime ||
      !(a.postTime.toDate() instanceof Date) ||
      !(b.postTime.toDate() instanceof Date)
    ) {
      return 0;
    }

    return b.postTime.toDate() - a.postTime.toDate();
  });

  return result;
};

export const updateSharing = async (data) => {
  const postRef = doc(db, "posts", data.id);

  updatedData = {
    title: data.title,
    content: data.content,
    imageUrl: data.imageUrl,
    postTime: data.postTime,
    likes: data.likes,
    reviews: data.reviews,
    userId: data.userId,
    likeByUsers: data.likeByUsers,
  };

  await updateDoc(postRef, updatedData).then(() => {
    console.log("Post updated");
  });
};
