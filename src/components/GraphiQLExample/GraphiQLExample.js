import React, { useState, useEffect, useCallback } from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { 
	gql, 
	useQuery, 
	useMutation,
	useApolloClient, } from '@apollo/client';
import { graphql } from '@apollo/react-hoc';

//	curl \
//	  -X POST \
//	  -H "Content-Type: application/json" \
//	  --data '{ "query": "{ droid(id: 2001) { id name friends {id name} appearsIn primaryFunction } }" }' \
//	  http://localhost:4000/graphql

//	curl -X POST --data '{ "user_id": "123", "auth_token": "ABC123", \
//	    "status": "hello world!", "media_ids": "ABC987" }' \
//	    https://twitter.com/api/v1/tweet

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
			episode @client(always: true)
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
			//	onCompleted() {
			//		client.writeData({ data: { } });
			//	}
		}
	);

	//	update local data in the cache with either 'direct cache writes' or 'client resolvers'
	//	two ways to perform local state mutations:
	//		1) directly write to the cache by calling cache.writeQuery
	//		2) leveraging the useMutation hook with a GraphQL mutation that calls a local client-side resolver

	//	https://www.apollographql.com/docs/react/v3.0-beta/data/mutations/
	//	https://www.apollographql.com/docs/react/v3.0-beta/data/local-state/
	//		https://www.apollographql.com/docs/react/v3.0-beta/data/local-state/#local-data-query-flow
	//	https://www.apollographql.com/docs/react/v3.0-beta/caching/cache-interaction/
	//	https://www.apollographql.com/docs/react/v3.0-beta/api/react/hooks/

	//	@client (directive):
	//	useApolloClient direct write to the cache
	//	onCompleted:
	const [addReview,{ loading: mutationLoading, error: mutationError, data: mutationData },] = useMutation(
		ADD_REVIEW,
		{
			variables: {
				episode: "EMPIRE",
				review: {stars: 5, commentary: "Wow, that was awesome" }
			},
			refetchQueries: () => [{ query: GET_REVIEWS, variables: { episode: "EMPIRE" }}],
		}
	);
	// const r = useCallback((r) => {addReview({ variables: {} });}, []);

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

						<div className="mb-2">

							<p>Apollo Mutation & Query Fun!</p>

							{queryLoading && (
								<div>
									<p>Loading queryLoading...</p>
								</div>
							)}
							
							{queryError && (
								<div>
									<p>Error queryError:(</p>
								</div>
							)}

							{queryData && (
								<div>
									YES, queryData data!!!!!!
								</div>
							)}

							{mutationLoading && (
								<div>
									<p>Loading mutationLoading...</p>
								</div>
							)}
							
							{mutationError && (
								<div>
									<p>Error mutationError:(</p>
								</div>
							)}

							{mutationData && (
								<div>
									YES, mutationData data!!!!!!
								</div>
							)}

						</div>

						<div>
							<button onClick={() => refetch()}>refetch</button>

							<button
								onClick={() => client.writeQuery({
									query: GET_REVIEWS,
									data: queryData
								})}
								className={`btn btn-success`}
							>
								writeQuery
							</button>

							<button onClick={() => addReview()} className={`btn btn-success`} >
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
