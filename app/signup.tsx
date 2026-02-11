import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";

export default function SignupScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const auth = getAuth(app);

  async function signupPressHandler() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("success");
      router.replace("/");
    } catch (error: any) {
      console.log("Signup error:", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Create Account</Text>
      <TextInput
        style={styles.emailInput}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.passwordInput}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={signupPressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: "center",
  },

  titleText: {
    marginBottom: 20,
  },
  emailInput: {
    marginBottom: 20,
  },
  passwordInput: {
    marginBottom: 20,
  },
});
