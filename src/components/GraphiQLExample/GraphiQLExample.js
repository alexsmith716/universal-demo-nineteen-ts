import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { gql, useQuery, useMutation } from '@apollo/client';

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
			stars
			commentary
		}
	}
`;

export const GraphiQLExample = () => {

	const styles = require('./scss/GraphiQLExample.scss');
	// require('graphiql/graphiql.css');

	// const { loading, error, data } = useQuery(GET_A_DROID, { variables: { droidID: 2000 }});
	const { loading, error, data } = useQuery(GET_REVIEWS, { variables: { episode: "EMPIRE" }});

	useEffect(
		() => {
			// componentDidMount
			console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > (componentDidMount)');

			if (error) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > (componentDidMount) > useQuery > error: ', error);
			}

			if (loading) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > (componentDidMount) > useQuery > loading: ', loading);
			}

			// componentDidUpdate
			if (data) {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > (componentDidMount) > useQuery > data: ', data);
			}

			// componentWillUnmount
			return () => {
				// some effects might require cleanup
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > useEffect() > (componentWillUnmount) > cleanup phase');
			};
		},
	);

	return (

		<div className="container">

			<Helmet title="GraphiQL Webpack Example" />

			<h1 className={styles.uniqueColor}>GraphiQL Webpack Example</h1>

			<p>An graphical interactive in-browser GraphQL IDE</p>

			{/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

			<div className="row">

				<div className="col-lg-12 mb-4">

					<div className="card h-100">

						<h2 className="card-header text-center font-tester-font2">
							GraphiQL Example
						</h2>

						<div className="card-body">

							<h5 className="card-title text-center">
								Custom ES6 GraphiQL Implementation
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
													credentials: 'same-origin',
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
