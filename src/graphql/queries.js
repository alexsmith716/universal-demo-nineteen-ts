import { gql } from '@apollo/client';

export const GET_A_DROIDa =gql`
	query getDroid {
		droid(id: 2001) {
			name
		}
	}
`;

export const GET_A_DROIDb =gql`
	query {
		droid(id: 2001) {
			name
		}
	}
`;

export const GET_A_DROIDc =gql`
	{
		droid(id: 2001) {
			name
		}
	}
`;

//	export const products = {
//		getAll: {
//			name: "products",
//			graphql: `query {
//				products { id, name, category, price}
//			}`
//		},
//		getOne: {
//			name: "product",
//			graphql: `query ($id: ID!) {
//				product(id: $id) {
//					id, name, category, price
//				}
//			}`
//		}
//	}

//	const GET_NEW_PUBLIC_TODOS = gql`
//		query getNewPublicTodos ($latestVisibleId: Int) {
//			todos(where: { is_public: { _eq: true}, id: {_gt: $latestVisibleId}}, order_by: { created_at: desc }) {
//				id
//				title
//				created_at
//				user {
//					name
//				}
//			}
//		}
//	`;

//	const FETCH_NEW_TODOS = gql`
//	 query ($lastId: Int){
//		todos (
//			order_by: {
//				id: desc
//			},
//			where: {
//				_and: {
//					is_public: { _eq: true},
//					id: { _gt: $lastId}
//				}
//			}
//		) {
//			id
//			title
//			is_completed
//			created_at
//			is_public
//			user {
//				name
//			}
//		}
//	}
//	`;
