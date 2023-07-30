import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    createdAt: String!
    updatedAt: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
  }
`;
