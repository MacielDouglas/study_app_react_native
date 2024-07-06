import { gql } from "@apollo/client";

export const NEW_COMMENT = gql`
  mutation recipeComment($newRating: NewRatingInput!) {
    rateRecipe(newRating: $newRating) {
      ratings {
        comment
        rating
      }
    }
  }
`;
