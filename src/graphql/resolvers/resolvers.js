import fetch from 'node-fetch';

export const resolvers = {
	Query: {
		character: async () => {
			const results = await fetch('https://rickandmortyapi.com/api/character/1');
			const character = await results.json();
			return character;
		},
	},
};