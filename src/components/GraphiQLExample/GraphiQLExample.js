import React, { useState, useEffect, useCallback } from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { gql, useQuery, useMutation } from '@apollo/client';
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
			episode
			stars
			commentary
		}
	}
`;

export const ADD_REVIEW = gql`
	mutation createReview($episode: Episode, $review: ReviewInput!) {
		createReview(episode: $episode, review: $review ) {
			stars
			commentary
		}
	}
`;

export const GraphiQLExample = () => {

	const styles = require('./scss/GraphiQLExample.scss');

	// const { loading, error, data } = useQuery(GET_DROID_RD);
	// const { loading, error, data } = useQuery(GET_A_DROID, { variables: { droidID: 2000 }});
	// const { loading, error, data } = useQuery(GET_REVIEWS, { variables: { episode: "EMPIRE" }});

	const [addReview,{ loading, error, data },] = useMutation(ADD_REVIEW, {variables: {episode: "EMPIRE", review: {stars: 5, commentary: "Wow, that was awesome" }},});
	// const r = useCallback((r) => {addReview({ variables: {} });}, []);

	useEffect(() => {
			// componentDidMount
			console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample!!!! > useEffect() > componentDidMount');

			// componentDidUpdate
			if (error) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > componentDidUpdate > error: ', error);
			}
			// componentDidUpdate
			if (loading) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > componentDidUpdate > loading: ', loading);
			}
			// componentDidUpdate
			if (data) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > componentDidUpdate > data: ', data);
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

							{loading && (
								<div>
									<p>Loading...</p>
								</div>
							)}
							
							{error && (
								<div>
									<p>Error :(</p>
								</div>
							)}

							{data && (
								<div>
									YES, mutated data!!!!!!
								</div>
							)}

				    </div>

						<div>
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
