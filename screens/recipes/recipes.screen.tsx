import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_RECIPES } from "@/graphql/queries/recipe.query";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import Loader from "@/components/loader/loader";
import { LinearGradient } from "expo-linear-gradient";
import RecipeCard from "@/components/cards/recipe.card";

export default function RecipeScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [filterRecipes, setFilterRecipes] = useState<RecipeType[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const { data, loading, error } = useQuery(ALL_RECIPES);

  useEffect(() => {
    if (data) setRecipes(data.getRecipes);
  }, [loading, data]);

  const uniqueCategories = [...new Set(recipes.map((item) => item.category))];

  if (!fontsLoaded && !fontError) return null;

  const handleCategories = (e: string) => {
    setActiveCategory(e);

    if (e === "All") {
      setFilterRecipes(recipes);
    } else {
      const filterRecipes = recipes.filter((i: RecipeType) => i.category === e);
      setFilterRecipes(filterRecipes);
    }
  };

  console.log(uniqueCategories);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={["#E5ECF9", "#F6F7F9"]}
          style={{ flex: 1, paddingTop: 65 }}
        >
          <View style={{ padding: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor:
                    activeCategory === "All" ? "#2467EC" : "#000",
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  marginRight: 5,
                }}
                onPress={() => handleCategories("All")}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                >
                  Todos
                </Text>
              </TouchableOpacity>
              {uniqueCategories.map((item) => (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor:
                      activeCategory === item ? "#2467EC" : "#000",
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    marginHorizontal: 15,
                  }}
                  onPress={() => handleCategories(item)}
                >
                  <Text
                    key={item}
                    style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={{ marginVertical: 10 }}>
            <ScrollView style={{ marginHorizontal: 15, gap: 12 }}>
              {filterRecipes?.map((item: RecipeType, index: number) => (
                <RecipeCard item={item} key={index} />
              ))}
            </ScrollView>
          </View>
        </LinearGradient>
      )}
    </>
  );
}
