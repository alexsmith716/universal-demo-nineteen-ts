import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import GraphiQL from 'graphiql';
// import 'graphiql/graphiql.css';

// inspectpack / DuplicatesPlugin: seems to have a problem with 'graphiql/graphiql.css' import
// https://github.com/FormidableLabs/inspectpack/#diagnosing-duplicates
// https://github.com/FormidableLabs/inspectpack/issues/125
// Fix?:
// https://github.com/FormidableLabs/inspectpack/issues/132

// {
//   person(personID: 3) {
//     name
//   }
// }

class GraphiQLExample extends Component {

	render() {

		const styles = require('./scss/GraphiQLExample.scss');
		require('graphiql/graphiql.css');

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
													'https://swapi-graphql.netlify.com/.netlify/functions/index',
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
}

export default GraphiQLExample;
