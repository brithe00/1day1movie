import { gql } from 'graphql-tag';

export const typeDefs = gql`
	#graphql
	type User {
		id: ID!
		username: String!
		email: String!
	}

	type AuthPayload {
		user: User!
		token: String!
	}

	input RegisterInput {
		username: String!
		email: String!
		password: String!
	}

	input LoginInput {
		username: String!
		password: String!
	}

	type Query {
		users: [User!]!
		me: User
	}

	type Mutation {
		register(input: RegisterInput!): AuthPayload!
		login(input: LoginInput!): AuthPayload!
	}
`;
