import React from 'react';
import { Helmet } from 'react-helmet-async';
import GraphiQL from 'graphiql';
// import 'graphiql/graphiql.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// 'http://localhost:4000/graphql',
// {
//   person(personID: 3) {
//     name
//   }
// }

// 'https://swapi-graphql.netlify.com/.netlify/functions/index',
// {
//   droid(id: 2001) {
//     name
//   }
// }

export const GET_R2_D2 = gql`
  query getDroid($droidID: ID!) {
    droid(id: $droidID) {
      name
    }
  }
`;

export const GraphiQLExample = () => {

	const styles = require('./scss/GraphiQLExample.scss');
	require('graphiql/graphiql.css');

	const { loading, error, data } = useQuery(GET_R2_D2, { variables: { droidID: 2001 } });

	console.log('>>>>>>>>>>>>>>>>>>>>>>>> GraphiQLExample > GET_R2_D2 > name: ', data);

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
