import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Platform, View } from "react-native";
import { Stack } from "expo-router";

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

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const getGraphQLUri = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:8000/graphql"; // Emulador Android
  } else {
    return "https://receitasdecasa.vercel.app/graphql"; // Emulador iOS
  }
};

const client = new ApolloClient({
  uri: getGraphQLUri(),
  cache: new InMemoryCache(),
  credentials: "include",
});

function RootLayoutNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? (
        <View></View>
      ) : (
        <ApolloProvider client={client}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(routes)/welcome-intro/index" />
            <Stack.Screen name="(routes)/login/index" />
            <Stack.Screen name="(routes)/sign-up/index" />
            <Stack.Screen name="(routes)/forgot-password/index" />
          </Stack>
        </ApolloProvider>
      )}
    </>
  );
}
