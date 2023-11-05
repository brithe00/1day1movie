import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
	return bcrypt.hash(password, 5);
};

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

export const createJwt = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
		},
		process.env.JWT_SECRET
	);

	return token;
};

export const exclude = (user, keys) => {
	return Object.fromEntries(
		Object.entries(user).filter(([key]) => !keys.includes(key))
	);
};
