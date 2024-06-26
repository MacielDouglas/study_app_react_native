import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/queries/user.query";
import { Toast } from "react-native-toast-notifications";
import { router } from "expo-router";

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
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
        style: { marginTop: 50 },
        animationType: "slide-in",
      });
      router.push("/(tabs)");
      console.log("Login Successful: ", data);
    },
  });

  const eliminado = AsyncStorage.removeItem("access_user");
  console.log("Eliminado", eliminado);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem("access_user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setIsUserLoaded(true);
    };

    fetchUserData();
  }, []);

  if (!isUserLoaded) {
    return { loading: true, user: null, loginQuery, error };
  }

  return { loading, user, loginQuery, error };
}
