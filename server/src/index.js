import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './types/index.js';
import { UserResolvers } from './resolvers/userResolvers.js';
import { prisma } from './config/db.js';

const start = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers: [UserResolvers],
	});

	const { url } = await startStandaloneServer(server, {
		context: async () => ({
			prisma,
		}),
		listen: { port: 4002 },
	});

	console.log(`🚀  Server ready at: ${url}`);
};

start();
