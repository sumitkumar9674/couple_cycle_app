import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebaseConfig";

const db = getFirestore(app);

class ChatService {
  async sendMessage(text: string, userId: string, userName: string) {
    await addDoc(collection(db, "messages"), {
      text: text,
      senderId: userId,
      senderName: userName,
      createdAt: serverTimestamp(),
    });
  }

  listenToMessages(callback: (messages: any[]) => void) {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });
  }
}

export default new ChatService();
