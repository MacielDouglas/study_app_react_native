import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";

export default function RecipeCard({ item }: { item: RecipeType }) {
  console.log("ITEM: ", item.image);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/(routes)/course-details",
          params: { item: JSON.stringify(item) },
        })
      }
    >
      <View style={{ paddingHorizontal: 10 }}>
        <Image
          style={{
            width: wp(86),
            height: 220,
            borderRadius: 5,
            alignSelf: "center",
            objectFit: "cover",
          }}
          source={{ uri: item.image }}
        />
        <View style={{ width: wp(85) }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "left",
              marginTop: 10,
              fontFamily: "Raleway_600SemiBold",
            }}
          >
            {item.title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#141517",
              padding: 4,
              borderRadius: 5,
              gap: 4,
              paddingHorizontal: 10,
              height: 28,
              marginTop: 10,
            }}
          >
            <FontAwesome name="star" size={14} color={"#ffb800"} />
            <Text style={[styles.ratingText]}>{item?.ratings}</Text>
          </View>
          <Text>{item.category} </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ paddingTop: 10, fontSize: 14 }}>
              <FontAwesome5 name="clock" size={14} color="black" /> Tempo
              {item?.price}
            </Text>
            {/* <Text
              style={{
                paddingLeft: 5,
                textDecorationLine: "line-through",
                fontSize: 16,
                fontWeight: "400",
              }}
            >
              $ tempo{item?.estimatedPrice}
            </Text> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="list-ol" size={18} color={"#8A8A8A"} />
            <Text style={{ marginLeft: 5 }}>
              {item.ingredients.length} ingredientes
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF",
    marginHorizontal: 6,
    borderRadius: 12,
    width: "95%",
    height: "auto",
    overflow: "hidden",
    margin: "auto",
    marginVertical: 15,
    padding: 8,
  },
  ratingText: {
    color: "white",
    fontSize: 14,
  },
});
