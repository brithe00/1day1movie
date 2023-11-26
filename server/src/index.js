import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './types/index.js';
import { UserResolvers } from './resolvers/userResolvers.js';
import { prisma } from './config/db.js';
import jwt from 'jsonwebtoken';
import { AdminResolvers } from './resolvers/adminResolvers.js';

const start = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers: [UserResolvers, AdminResolvers],
	});

	const { url } = await startStandaloneServer(server, {
		context: async ({ req }) => {
			let user = null;

			const authorization = req.headers.authorization;

			if (authorization) {
				const token = authorization.replace('Bearer ', '');

				try {
					user = jwt.verify(token, process.env.JWT_SECRET);
				} catch (error) {
					console.error('Invalid token', error);
				}
			}

			return { prisma, user };
		},
		listen: { port: 4000 },
	});

	console.log(`🚀  Server ready at: ${url}`);
};

start();
