import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

type RatingsProps = {
  ratings: number;
};

export default function Ratings({ ratings }: RatingsProps) {
  const filledStars = Math.floor(ratings);
  const halfStar = ratings % 1 !== 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(
          <FontAwesome key={i} name="star" size={18} color="#FF8D07" />
        );
      } else if (i === filledStars + 1 && halfStar) {
        stars.push(
          <Ionicons
            key={i}
            name="star-half-outline"
            size={18}
            color="#FF8D07"
          />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={18} color="#FF8D07" />
        );
      }
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: "row", marginTop: 4, marginLeft: 2, gap: 4 }}>
      {renderStars()}
    </View>
  );
}
