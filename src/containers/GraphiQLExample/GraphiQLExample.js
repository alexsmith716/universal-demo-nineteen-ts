import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';

// {
//   person(personID: 3) {
//     name
//   }
// }
// >>>>>>>> {
// >>>>>>>>   "data": {
// >>>>>>>>     "person": {
// >>>>>>>>       "name": "R2-D2"
// >>>>>>>>     }
// >>>>>>>>   }
// >>>>>>>> }

class GraphiQLExample extends Component {

	render() {

		const styles = require('./scss/GraphiQLExample.scss');

		return (

			<div className="container">

				<Helmet title="GraphiQL Webpack Example" />

				<h1 className={styles.uniqueColor}>GraphiQL Webpack Example</h1>

				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>

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
