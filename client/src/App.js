import request from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { listUsers } from './graphql/queries/users';

function App() {
	const { data } = useQuery({
		queryKey: ['users'],
		queryFn: async () => request('http://localhost:4000/', listUsers),
	});

	return (
		data &&
		data.users.map((user) => (
			<pre key={user.id}>{JSON.stringify(user, null, 2)}</pre>
		))
	);
}

export default App;
