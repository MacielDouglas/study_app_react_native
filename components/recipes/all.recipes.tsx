import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useRef } from "react";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";
import {
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { router } from "expo-router";
import { useQuery } from "@apollo/client";
import { ALL_RECIPES } from "@/graphql/queries/recipe.query";

import RecipeCard from "../cards/recipe.card";

export default function AllRecipes() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_600SemiBold,
    Raleway_600SemiBold,
    Nunito_500Medium,
  });
  const { data, loading, error } = useQuery(ALL_RECIPES);
  const flatListRef = useRef(null);
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;
  console.log("Receitas: ", data.getRecipes);

  if (!fontError && !fontsLoaded) return null;
  return (
    <View style={{ flex: 1, marginHorizontal: 16, marginTop: 30 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Receitas Populares</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/recipes")}>
          <Text
            style={{
              fontSize: 15,
              color: "#2467EC",
              fontFamily: "Nunito_600SemiBold",
            }}
          >
            Veja mais
          </Text>
        </TouchableOpacity>
        {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
          {data.getRecipes.map((recipe: { id: string; title: string }) => (
            <Text key={recipe.id}>{recipe.title}</Text>
          ))}
        </View> */}
      </View>
      <FlatList
        ref={flatListRef}
        data={data.getRecipes}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecipeCard item={item} />}
      />
    </View>
  );
}
