import React, { useState, useEffect, useCallback } from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { 
	gql, 
	useQuery, 
	useMutation,
	useApolloClient, } from '@apollo/client';
import { graphql } from '@apollo/react-hoc';

//	https://www.apollographql.com/docs/react/v3.0-beta/api/core/ApolloClient/
//	https://www.apollographql.com/docs/react/v3.0-beta/data/queries/
//	https://www.apollographql.com/docs/react/v3.0-beta/data/mutations/
//	https://www.apollographql.com/docs/react/v3.0-beta/data/local-state/
//	https://www.apollographql.com/docs/react/v3.0-beta/caching/cache-configuration/
//	https://www.apollographql.com/docs/react/v3.0-beta/caching/cache-interaction/
//	https://www.apollographql.com/docs/react/v3.0-beta/performance/performance/
//	https://www.apollographql.com/docs/react/v3.0-beta/api/react/hooks/

//	https://www.apollographql.com/docs/react/v3.0-beta/performance/optimistic-ui/
//	https://www.apollographql.com/docs/react/v3.0-beta/migrating/apollo-client-3-migration/

//	update local data in the cache with either 'direct cache writes' or 'client resolvers'
//	two ways to perform local state mutations:
//		1) directly write to the cache by calling "cache.writeQuery"
//		2) leveraging the useMutation hook with a GraphQL mutation that calls a local client-side resolver

//	@client directive: tells Apollo Client to fetch the field data locally (either from the cache or using a local resolver), 
//		instead of sending it to GraphQL server

//	=========================================================================================================
//	ApolloClient functions:

//		query():     resolves a single query and returns a Promise which is either resolved with data or an error
//		readQuery(): read data from the store in shape of provided GraphQL query
//									does not make network request
//									method starts at the root query

//		writeQuery(): write data in the shape of the provided GraphQL query directly to store
//									method starts at the root query
//	=========================================================================================================

//	useMutation hook accepts some options:
//		update: function used to update cache after a mutation occurs
//		refetchQueries: array or function that specifies which queries to refetch after mutation has occurred. array values either queries or query strings
//		onCompleted: callback executed once mutation successfully completes
//		client: 'ApolloClient' instance. By default the client passed down via context, but a different client can be passed in

//	curl \
//	  -X POST \
//	  -H "Content-Type: application/json" \
//	  --data '{ "query": "{ droid(id: 2001) { id name friends {id name} appearsIn primaryFunction } }" }' \
//	  http://localhost:4000/graphql

export const GET_A_DROID = gql`
	query GetADroid($droidID: ID!) {
		droid(id: $droidID) {
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

export const GET_REVIEWS = gql`
	query GetEpisodeReviews($episode: Episode!) {
		reviews(episode: $episode) {
			episode
			stars
			commentary
		}
	}
`;

export const ADD_REVIEW = gql`
	mutation createReview($episode: Episode, $review: ReviewInput!) {
		createReview(episode: $episode, review: $review ) {
			episode
			stars
			commentary
		}
	}
`;

export const GraphiQLExample = () => {

	const client = useApolloClient();

	const styles = require('./scss/GraphiQLExample.scss');

	// const { loading, error, data } = useQuery(GET_DROID_RD);
	// const { loading, error, data } = useQuery(GET_A_DROID, { variables: { droidID: 2000 }});
	const { loading: queryLoading, error: queryError, data: queryData, refetch } = useQuery(
		GET_REVIEWS,
		{
			variables: {
				episode: "EMPIRE",
			},
		}
	);

	const [addReview,{ loading: mutationLoading, error: mutationError, data: mutationData },] = useMutation(
		ADD_REVIEW,
		{
			variables: {
				episode: "EMPIRE",
				review: {stars: 5, commentary: "Wow, how about EMPIRE!" }
			},
			refetchQueries: () => [{ query: GET_REVIEWS, variables: { episode: "EMPIRE" }}],
		}
	);

	useEffect(() => {
			// componentDidMount
			console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample!!!! > useEffect() > componentDidMount');

			// componentDidUpdate
			if (queryError) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > componentDidUpdate > queryError: ', queryError);
			}
			// componentDidUpdate
			if (queryLoading) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > componentDidUpdate > queryLoading: ', queryLoading);
			}
			// componentDidUpdate
			if (queryData) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > componentDidUpdate > queryData: ', queryData);
			}

			// componentDidUpdate
			if (mutationError) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > componentDidUpdate > mutationError: ', mutationError);
			}
			// componentDidUpdate
			if (mutationLoading) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > componentDidUpdate > mutationLoading: ', mutationLoading);
			}
			// componentDidUpdate
			if (mutationData) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > componentDidUpdate > mutationData: ', mutationData);
			}

			// componentWillUnmount
			return () => {
				// some effects might require cleanup
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > componentWillUnmount > cleanup phase');
			};
		},
	);

	return (

		<div className="container">

			<h1 className={styles.uniqueColor}>GraphiQL Webpack Example</h1>

			{/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

			<div className="row">
				<div className="col-lg-12 mb-4">
					<div className="bg-color-ivory container-padding-border-radius-1 text-break">

						<div>

							{queryLoading && (
								<p>
									Loading queryLoading...
								</p>
							)}
							
							{queryError && (
								<p>
									Error queryError:(
								</p>
							)}

							{queryData && (
								<p>
									YES, queryData data!
								</p>
							)}

							{mutationLoading && (
								<p>
									Loading mutationLoading...
								</p>
							)}
							
							{mutationError && (
								<p>
									Error mutationError:(
								</p>
							)}

							{mutationData && (
								<p>
									YES, mutationData data!
								</p>
							)}

						</div>

						<div>
							<button 
								onClick={() => refetch()}
								className={`btn btn-success`}
							>
								refetch
							</button>

							<button
								onClick={() => client.writeQuery({
									query: GET_REVIEWS,
									data: queryData
								})}
								className={`btn btn-success`}
							>
								writeQuery
							</button>

							<button 
								onClick={() => addReview()} 
								className={`btn btn-success`} 
							>
								useMutation
							</button>

						</div>
					</div>
				</div>
			</div>

			<div className="row">

				<div className="col-lg-12 mb-4">

					<div className="card h-100">

						<h2 className="card-header text-center font-tester-font2">
							GraphiQL Example
						</h2>

						<div className="card-body">

							<h5 className="card-title text-center">
								An graphical interactive in-browser GraphQL IDE!
							</h5>

							<div className="card-body-container">

								<div className="card-body-content vh-100">

									<GraphiQL
										fetcher={async graphQLParams => {
											const data = await fetch(
												'http://localhost:4000/graphql',
												{
													method: 'POST',
													headers: {
														Accept: 'application/json',
														'Content-Type': 'application/json',
													},
													body: JSON.stringify(graphQLParams),
												},
											);
											return data.json().catch(() => data.text());
										}}
									/>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

		</div>
	);
}
