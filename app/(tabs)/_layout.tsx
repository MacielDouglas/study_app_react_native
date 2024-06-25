import useUser from "@/hooks/auth/useUser";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  const { user } = useUser();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "home/index") {
            iconName = require("@/assets/icons/home_com.png");
          } else if (route.name === "search/index") {
            iconName = require("@/assets/icons/search_com.png");
          } else if (route.name === "recipes/index") {
            iconName = require("@/assets/icons/recipe_com.png");
          } else if (route.name === "profile/index") {
            iconName = require("@/assets/icons/profile_com.png");
            // iconName =
            //   user?.profilePicture || require("@/assets/icons/profile_com.png");
          }
          return (
            <Image
              style={{ width: 25, height: 25, tintColor: color }}
              source={iconName}
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen name="home/index" />
      <Tabs.Screen name="search/index" />
      <Tabs.Screen name="recipes/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}
