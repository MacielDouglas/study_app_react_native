import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_RECIPES } from "@/graphql/queries/recipe.query";
import { router } from "expo-router";
import RecipeCard from "../cards/recipe.card";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function SearchInput({ homeScreen }: { homeScreen?: boolean }) {
  const { data, loading, error } = useQuery(ALL_RECIPES);
  const [value, setValue] = useState("");
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [filterRecipes, setFilterRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    if (data) setRecipes(data.getRecipes);
  }, []);

  useEffect(() => {
    if (homeScreen && value === "") {
      setFilterRecipes([]);
    } else if (value) {
      const filtered = recipes.filter((recipe: RecipeType) =>
        recipe.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilterRecipes(filtered);
    } else if (!homeScreen) {
      setFilterRecipes(recipes);
    }
  }, [value, recipes]);

  let [fontsLoaded, fontError] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded && fontError) return null;

  const renderRecipeItem = ({ item }: { item: RecipeType }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#FFF",
        padding: 10,
        width: widthPercentageToDP("90%"),
        marginLeft: "1.5%",
        flexDirection: "row",
      }}
      onPress={() =>
        router.push({
          pathname: "/(routes)/recipe-details",
          params: { item: JSON.stringify(item) },
        })
      }
    >
      <Image
        source={{
          uri: item.image,
        }}
        style={{ width: 60, height: 60, borderRadius: 10 }}
      />
      <Text
        style={{
          fontSize: 14,
          paddingLeft: 10,
          width: widthPercentageToDP("75%"),
          alignSelf: "center",
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.filteringContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.input, { fontFamily: "Nunito_700Bold" }]}
            placeholder="Search"
            value={value}
            onChangeText={setValue}
            placeholderTextColor={"#C67cc"}
          />
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={() => router.push("/(tabs)/search")}
          >
            <AntDesign name="search1" size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <FlatList
          data={filterRecipes}
          keyExtractor={(item: RecipeType) => item.id}
          renderItem={
            homeScreen
              ? renderRecipeItem
              : ({ item }) => <RecipeCard item={item} key={item.id} />
          }
        />
      </View>
      {!homeScreen && (
        <>
          {filterRecipes?.length === 0 && (
            <Text
              style={{
                textAlign: "center",
                paddingTop: 50,
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Não encontramos essa receita: {value}!
            </Text>
          )}
        </>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  filteringContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },

  searchIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: "#2467EC",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "black",
    paddingVertical: 10,
    width: 271,
    height: 48,
  },
});
