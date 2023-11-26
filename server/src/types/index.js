import { gql } from 'graphql-tag';

export const typeDefs = gql`
	#graphql
	type User {
		id: ID!
		username: String!
		email: String!
		isAdmin: Boolean!
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

	input UpdateUserAdmin {
		isAdmin: Boolean!
	}

	type Query {
		users: [User!]!
		user(id: ID!): User
		me: User
		listUsers: [User!]!
		getUser(id: ID!): User!
	}

	type Mutation {
		register(input: RegisterInput!): AuthPayload!
		login(input: LoginInput!): AuthPayload!
		updateUser(id: ID!, input: UpdateUserAdmin!): User!
	}
`;
