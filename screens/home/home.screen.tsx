import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import SearchInput from "@/components/common/search.input";
import HomeBannerSlider from "@/components/home/home.banner.slider";
import AllRecipes from "@/components/recipes/all.recipes";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <Header />
      <ScrollView>
        <SearchInput />
        <HomeBannerSlider />
        <AllRecipes />
      </ScrollView>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({});
