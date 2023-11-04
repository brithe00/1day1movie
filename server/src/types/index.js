import { gql } from 'graphql-tag';

export const typeDefs = gql`
	#graphql
	type Query {
		hello: String
	}
`;
