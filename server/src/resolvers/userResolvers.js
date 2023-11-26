import { GraphQLError } from 'graphql';
import { comparePasswords, createJwt, hashPassword } from '../utils/auth.js';
import { exclude } from '../utils/utils.js';

export const UserResolvers = {
	Query: {
		users: async (_, __, { prisma }) => {
			return await prisma.user.findMany({});
		},
		user: async (_, { id }, { prisma }) => {
			return await prisma.user.findUnique({
				where: {
					id,
				},
			});
		},
		me: async (_, __, { prisma, user }) => {
			if (!user) {
				throw new GraphQLError('Not authenticated', {
					extensions: {
						code: 'NOT_AUTHENTICATED',
					},
				});
			}

			const authenticatedUser = await prisma.user.findUnique({
				where: {
					id: user.id,
				},
			});

			return authenticatedUser;
		},
	},
	Mutation: {
		register: async (_, { input }, { prisma }) => {
			const { username, email, password } = input;

			const alreadyExistsUsername = await prisma.user.findUnique({
				where: {
					username,
				},
			});

			const alreadyExistsEmail = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (alreadyExistsUsername || alreadyExistsEmail) {
				throw new GraphQLError('Username or Email already exists !', {
					extensions: {
						code: 'USERNAME_OR_EMAIL_ALREADY_EXISTS',
					},
				});
			} else {
				const user = await prisma.user.create({
					data: {
						username,
						email,
						password: await hashPassword(password),
					},
				});

				const token = createJwt(user);
				const userWithoutPassword = exclude(user, ['password']);

				return { user: userWithoutPassword, token };
			}
		},
		login: async (_, { input }, { prisma }) => {
			const { username, password } = input;

			const user = await prisma.user.findUnique({
				where: {
					username,
				},
			});

			if (!user) {
				throw new GraphQLError('User not found !', {
					extensions: {
						code: 'USER_NOT_FOUND',
					},
				});
			}

			const passwordIsValid = await comparePasswords(password, user.password);

			if (!passwordIsValid) {
				throw new GraphQLError('Invalid username or password !', {
					extensions: {
						code: 'INVALID_USERNAME_OR_PASSWORD',
					},
				});
			}

			const token = createJwt(user);
			const userWithoutPassword = exclude(user, ['password']);

			return { user: userWithoutPassword, token };
		},
	},
};
