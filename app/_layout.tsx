import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import "react-native-reanimated";

import "../firebaseConfig";
import AuthService from "../services/AuthService";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const pathname = usePathname();
  const router = useRouter();

  const isAuthScreen = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    const unsubscribe = AuthService.onAuthChange((user) => {
      console.log("AUTH CHECK:", user ? `LOGGED IN (${user.uid})` : "NO USER");

      if (user) {
        if (isAuthScreen) {
          router.replace("/");
        }
        console.log("Auth state: user logged in");
      } else {
        if (!isAuthScreen) {
          router.replace("/login");
        }
        console.log("Auth state: no user");
      }
    });

    return () => unsubscribe();
  }, [pathname, isAuthScreen, router]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
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
