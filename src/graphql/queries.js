import { gql } from '@apollo/client';

export const GET_A_DROID_CP = gql`
	{
		droid(id: 2000) {
			id
			name
			friends {
				id
				name
			}
			appearsIn
			primaryFunction
		}
	}
`;

export const GET_A_DROID_RD = gql`
	{
		droid(id: 2001) {
			id
			name
			friends {
				id
				name
			}
			appearsIn
			primaryFunction
		}
	}
`;

export const GET_HERO = gql`
	{
		hero {
			name
		}
	}
`;

export const GET_THE_SCHEMA = gql`
	{
		__schema {
			types {
				name
				kind
				description
				fields {
					name
				}
			}
		}
	}
`;
