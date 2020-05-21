import { gql } from '@apollo/client';

export const GET_A_DROID =gql`
	{
		droid(id: 2001) {
			name
		}
	}
`;
