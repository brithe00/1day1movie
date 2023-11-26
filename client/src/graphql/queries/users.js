import { gql } from 'graphql-request';

export const listUsers = gql`
	query Users {
		users {
			id
			username
			email
			isAdmin
		}
	}
`;
