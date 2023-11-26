import { GraphQLError } from 'graphql';
import { checkIfRegisteredOrIsAdmin } from '../utils/utils.js';

export const AdminResolvers = {
	Query: {
		listUsers: async (_, __, { user, prisma }) => {
			checkIfRegisteredOrIsAdmin(user);
			return await prisma.user.findMany({});
		},
		getUser: async (_, { id }, { user, prisma }) => {
			checkIfRegisteredOrIsAdmin(user);
			return await prisma.user.findUnique({
				where: {
					id,
				},
			});
		},
	},
	Mutation: {
		updateUser: async (_, { id, input }, { user, prisma }) => {
			// just update the isAdmin status for now, you can't update a username or email like this...

			checkIfRegisteredOrIsAdmin(user);

			const { isAdmin } = input;

			const userToUpdate = await prisma.user.findUnique({
				where: {
					id,
				},
			});

			if (userToUpdate) {
				const updatedUser = await prisma.user.update({
					where: {
						id: userToUpdate.id,
					},
					data: {
						isAdmin,
					},
				});

				return updatedUser;
			} else {
				throw new GraphQLError('User not found !', {
					extensions: {
						code: 'USER_NOT_FOUND',
					},
				});
			}
		},
	},
};
