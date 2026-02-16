import { auth } from "@/firebaseConfig";
import ChatService from "@/services/ChatService";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function chatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState<string>("");

  const flatListRef = useRef<FlatList<any>>(null);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    const unsubscribe = ChatService.listenToMessages((msgs) => {
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  function handleSend() {
    if (!text.trim()) {
      return;
    }

    if (!auth.currentUser) {
      return;
    }
    const userName = auth.currentUser.displayName || "User";

    ChatService.sendMessage(text, auth.currentUser.uid, userName);

    setText("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.contentContainerStyle}
        onContentSizeChange={() => {
          requestAnimationFrame(() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToEnd({
                animated: !initialLoadRef.current,
              });

              initialLoadRef.current = false;
            }
          });
        }}
        onLayout={() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd();
          }
        }}
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isMyMessage = item.senderId === auth.currentUser?.uid;

          return (
            <View
              style={[
                isMyMessage ? styles.currentUserText : styles.otherUserText,
                styles.messageBubble,
              ]}
            >
              <Text style={styles.listText}>{item.text}</Text>
            </View>
          );
        }}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type message..."
      />
      <Button title="Send" onPress={handleSend} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainerStyle: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  currentUserText: {
    alignSelf: "flex-end",
    backgroundColor: "#ea7a6e",
  },
  otherUserText: {
    alignSelf: "flex-start",
    backgroundColor: "#cdcddb",
  },

  listText: {
    marginHorizontal: 7,
    fontSize: 16,
  },
  messageBubble: {
    padding: 10,
    margin: 4,
    borderRadius: 10,
    maxWidth: "70%",
    minWidth: "7%",
  },
});
