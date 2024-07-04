import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ONE_USER } from "@/graphql/queries/user.query";
import { FontAwesome } from "@expo/vector-icons";
import Ratings from "@/utils/ratings";

export default function ReviewCard({ item }: { item: ReviewType }) {
  const [userQuery, { loading, error, data }] = useLazyQuery(ONE_USER);
  const [user, setUser] = useState("");

  useEffect(() => {
    userQuery({
      variables: {
        getUserId: item.userId,
      },
    });
    setUser(data);
  }, [data, loading, user]);

  if (loading)
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  // console.log("ReviewCard: ", user?.getUser);
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 100 }}
        source={{
          uri:
            user?.getUser?.profilePicture ||
            "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1719878400&semt=sph",
        }}
      />
      <View style={{ marginHorizontal: 8, flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontFamily: "Raleway_700Bold" }}>
                {user?.getUser?.username}
              </Text>
              <View>
                <Ratings ratings={item.rating} />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  paddingVertical: 5,
                  paddingHorizontal: 3,
                }}
              >
                {item.comment === "" ? "Sem Comentários" : item.comment}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
