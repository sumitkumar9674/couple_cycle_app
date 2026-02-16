import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import "react-native-reanimated";

import "../firebaseConfig";
import AuthService from "../services/AuthService";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [initializing, setInitializing] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = AuthService.onAuthChange((user) => {
      if (initializing) {
        setInitializing(false);
      }

      console.log("AUTH CHECK:", user ? `LOGGED IN (${user.uid})` : "NO USER");

      if (!segments[0]) {
        console.log("Router not ready yet...");
        return;
      }

      const inAuthGroup = segments[0] === "(auth)";

      if (user && inAuthGroup) {
        router.replace("/");
        console.log("Redirect → Home");
      }

      if (!user && !inAuthGroup) {
        router.replace("/login");
        console.log("Redirect → Login");
      }
    });

    return () => unsubscribe();
  }, [segments]);

  if (initializing) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
