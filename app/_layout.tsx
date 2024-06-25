import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ToastProvider } from "react-native-toast-notifications";

import { Stack } from "expo-router";
import { LogBox } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const client = new ApolloClient({
  uri: "http://192.168.15.184:8000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

function RootLayoutNav() {
  return (
    <>
      <ToastProvider>
        <ApolloProvider client={client}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(routes)/welcome-intro/index" />
            <Stack.Screen name="(routes)/login/index" />
            <Stack.Screen name="(routes)/sign-up/index" />
            <Stack.Screen name="(routes)/forgot-password/index" />
          </Stack>
        </ApolloProvider>
      </ToastProvider>
    </>
  );
}
