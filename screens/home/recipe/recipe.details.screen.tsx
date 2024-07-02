import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

export default function RecipeDetailsScreen() {
  const { item } = useLocalSearchParams();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  const [activeButton, setActiveButton] = useState("Reviews");
  const [isExpanded, setIsExpanded] = useState(false);
  const recipeData: RecipeType = JSON.parse(item as string);
  const [checkPurchased, setCheckPurchased] = useState(false);
  //   const ratingsData: ReviewType = JSON.parse(item.recipeData.ratings as string);
  //4'01''49''
  console.log(item);

  if (!fontsLoaded && !fontError) return null;
  console.log("RECIPE_DATA=S: ", recipeData.ratings[0]?.rating);
  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 40 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 16 }}>
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              backgroundColor: "#FFB013",
              borderRadius: 54,
              paddingVertical: 8,
              paddingHorizontal: 12,
              marginTop: 8,
              marginLeft: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 14,
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Best Seller
            </Text>
          </View>
          <View style={{ position: "absolute", zIndex: 14, right: 0 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#141517",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 3,
                marginTop: 8,
                marginRight: 8,
              }}
            >
              {/* <FontAwesome name="star" size={14} color={"#FFB800"} /> */}
              <Text
                style={{
                  color: "#FFB800",
                  marginLeft: 4,
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                {recipeData.category}
                {/* {recipeData?.ratings} */}
              </Text>
            </View>
          </View>
          <Image
            source={{ uri: recipeData.image }}
            style={{ width: "100%", height: 230, borderRadius: 6 }}
          />
        </View>
        <Text
          style={{
            marginHorizontal: 16,
            marginTop: 15,
            fontSize: 20,
            fontWeight: "600",
            fontFamily: "Raleway_700Bold",
          }}
        >
          {recipeData?.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 10,
            marginHorizontal: 16,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#000",
                fontSize: 15,
                marginLeft: 10,
                paddingVertical: 10,
              }}
            >
              Em apenas{" "}
              {recipeData?.time[0] === "0"
                ? `${recipeData.time.slice(-2)} min`
                : `${recipeData.time} hs`}
            </Text>
          </View>
          <Text style={{ fontSize: 15 }}>
            dificuldade: {recipeData?.difficult}
          </Text>
        </View>
        <Text
          style={{
            // padding: 10,
            fontFamily: "Nunito_500Medium",
            fontSize: 18,
            marginHorizontal: 16,
          }}
        >
          {recipeData?.description}
        </Text>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Ingredientes</Text>
          {recipeData?.ingredients.map((item, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                width: "95%",
                paddingVertical: 5,
                marginHorizontal: 16,
              }}
            >
              <MaterialCommunityIcons name="silverware-fork" size={18} />

              <Text style={{ paddingLeft: 5, fontSize: 16 }}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            Modo de Preparo
          </Text>
          <Text
            style={{ fontSize: 18, fontWeight: "400", textAlign: "justify" }}
          >
            {recipeData.content}
          </Text>
          {/* {recipeData?.content.map((item, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                width: "95%",
                paddingVertical: 5,
              }}
            >
              <Ionicons name="checkmark-done-outline" size={18} />
              <Text style={{ paddingLeft: 5, fontSize: 16 }}>{item.title}</Text>
            </View>
          ))} */}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 25,
            marginHorizontal: 16,
            backgroundColor: "#E1E9F8",
            borderRadius: 50,
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 42,
              backgroundColor:
                activeButton === "About" ? "#2467EC" : "transparent",
              borderRadius: activeButton === "About" ? 50 : 0,
            }}
            onPress={() => setActiveButton("About")}
          >
            <Text
              style={{
                color: activeButton === "About" ? "#fff" : "#000",
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 42,
              backgroundColor:
                activeButton === "Reviews" ? "#2467EC" : "transparent",
              borderRadius: activeButton === "Reviews" ? 50 : 0,
            }}
            onPress={() => setActiveButton("Reviews")}
          >
            <Text
              style={{
                color: activeButton === "Reviews" ? "#fff" : "#000",
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Reviews
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 42,
              backgroundColor:
                activeButton === "Lessons" ? "#2467EC" : "transparent",
              borderRadius: activeButton === "Lessons" ? 50 : 0,
            }}
            onPress={() => setActiveButton("Lessons")}
          >
            <Text
              style={{
                color: activeButton === "Lessons" ? "#fff" : "#000",
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Lessons
            </Text>
          </TouchableOpacity>
        </View>
        {activeButton === "Reviews" && (
          <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
            <View style={{ rowGap: 25 }}>
              {/* {recipeData?.ratings?.map(
              (item: ReviewType, index: number) => (
                <ReviewCard item={item} key={index} />
              )
            )} */}
            </View>
          </View>
        )}
        {activeButton === "About" && (
          <View
            style={{
              marginHorizontal: 16,
              marginVertical: 25,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: "Raleway_700Bold" }}>
              About course
            </Text>
            <Text
              style={{
                color: "#525258",
                fontSize: 16,
                marginTop: 10,
                textAlign: "justify",
                fontFamily: "Nunito_500Medium",
              }}
            >
              {isExpanded
                ? recipeData?.description
                : recipeData?.description.slice(0, 302)}
            </Text>
            {recipeData?.description.length > 302 && (
              <TouchableOpacity
                style={{ marginTop: 3 }}
                onPress={() => setIsExpanded(!isExpanded)}
              >
                <Text
                  style={{
                    color: "#2467EC",
                    fontSize: 14,
                  }}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                  {isExpanded ? "-" : "+"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {/* {activeButton === "Lessons" && (
        <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
          <CourseLesson courseDetails={recipeData} />
        </View>
      )} */}
        {/* {activeButton === "Reviews" && (
        <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
          <View style={{ rowGap: 25 }}>
            {recipeData?.reviews?.map(
              (item: ReviewType, index: number) => (
                <ReviewCard item={item} key={index} />
              )
            )}
          </View>
        </View>
      )} */}
      </ScrollView>
      <View
        style={{
          backgroundColor: "#FFFF",
          marginHorizontal: 16,
          paddingVertical: 11,
          marginBottom: 10,
        }}
      >
        {checkPurchased === true ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#2467EC",
              paddingVertical: 16,
              borderRadius: 4,
            }}
            onPress={() =>
              router.push({
                pathname: "/(routes)/course-access",
                params: { recipeData: JSON.stringify(recipeData) },
              })
            }
          >
            <Text
              style={{
                textAlign: "center",
                color: "#FFFF",
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Go to the course
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#2467EC",
              paddingVertical: 16,
              borderRadius: 4,
            }}
            //   onPress={() => handleAddToCart()}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#FFFF",
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Add to cart
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}
