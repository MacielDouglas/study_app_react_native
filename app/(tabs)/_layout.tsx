import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home/index" />
      <Tabs.Screen name="search/index" />
      <Tabs.Screen name="recipes/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}
