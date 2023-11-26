import { GraphQLError } from 'graphql';

export const exclude = (user, keys) => {
	return Object.fromEntries(
		Object.entries(user).filter(([key]) => !keys.includes(key))
	);
};

export const checkIfRegisteredOrIsAdmin = (user) => {
	if (!user) {
		throw new GraphQLError('Not authenticated', {
			extensions: {
				code: 'NOT_AUTHENTICATED',
			},
		});
	} else if (!user.isAdmin) {
		throw new GraphQLError('Not authorized', {
			extensions: {
				code: 'NOT_AUTHORIZED',
			},
		});
	}
};
