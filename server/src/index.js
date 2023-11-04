import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './types/index.js';
import { UserResolvers } from './resolvers/userResolvers.js';

const start = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers: [UserResolvers],
	});

	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	});

	console.log(`🚀  Server ready at: ${url}`);
};

start();
