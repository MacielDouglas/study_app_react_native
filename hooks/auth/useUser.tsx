import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/queries/user.query";
import { Toast } from "react-native-toast-notifications";
import { router } from "expo-router";

export default function useUser() {
  const [user, setUser] = useState("");
  const [loginQuery, { loading, error, data }] = useLazyQuery(LOGIN_USER, {
    onError: (error) => {
      console.error("ApolloError: ", error.message);
      Toast.show(error.message, {
        type: "danger",
        placement: "top",
        duration: 5000,
        animationType: "zoom-in",
      });
    },
    onCompleted: (data) => {
      AsyncStorage.setItem("access_user", JSON.stringify(data.loginUser));
      Toast.show(`Bem-vindo(a) ${data.loginUser.name}.`, {
        type: "success",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
      router.push("/(tabs)/home");
      console.log("Login Successful: ", data);
    },
  });

  useEffect(() => {
    const subscription = async () => {
      const user = await AsyncStorage.getItem("access_user");
      if (user) {
        setUser(JSON.parse(user));
      }
    };
    subscription();
  }, []);
  return { loading, user, loginQuery, error };
}
