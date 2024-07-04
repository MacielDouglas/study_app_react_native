import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      username
      isAdmin
      profilePicture
    }
  }
`;

export const ONE_USER = gql`
  query oneUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      username
      profilePicture
    }
  }
`;
