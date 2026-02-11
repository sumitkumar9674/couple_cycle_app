import { useRouter } from "expo-router";

import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  function loginPressHandler() {
    router.push("/login");
  }

  function signupPressHandler() {
    router.push("/signup");
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Sign Up" onPress={signupPressHandler} />
      <Button title="Login" onPress={loginPressHandler} />
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
