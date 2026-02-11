import { useRouter } from "expo-router";

import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  function PressHandler() {
    router.push("/signup");
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Sign Up" onPress={PressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
