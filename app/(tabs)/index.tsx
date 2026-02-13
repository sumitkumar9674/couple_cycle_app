import { Button, StyleSheet, Text, View } from "react-native";
import AuthService from "../../services/AuthService";

export default function HomeScreen() {
  async function LogoutPressHandler() {
    await AuthService.logout();
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Log Out" onPress={LogoutPressHandler} />
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
