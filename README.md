# universal-demo-eightteen-ts

* ----------------------------------------
* ----------------------------------------

GraphiQLExample > DuplicatesPlugin > `import 'graphiql/graphiql.css';`

`WARNING in ℹ ｢wdm｣: Compiled with warnings.
[1mMissing sources: Expected 2, found 0.
    Found map: {}
    Duplicate Sources / Packages - Duplicates found! ⚠️
    * Duplicates: Found 2 similar files across 2 code sources (both identical + similar)
      accounting for 44449 bundled bytes.
    * Packages: Found 0 packages with 0 resolved, 0 installed, and 0 depended versions.`

https://github.com/FormidableLabs/inspectpack/#diagnosing-duplicates
https://github.com/FormidableLabs/inspectpack/issues/125

* ----------------------------------------
* ----------------------------------------

1) Describe your data

`type Project {
	name: String
	tagline: String
	contributors: [User]
}`

2) Ask for what you want

`{
	project(name: "GraphQL") {
		tagline
	}
}`

3) Get predictable results

`{
	"project": {
		"tagline": "A query language for APIs"
	}
}`

graphql:
A query language for your API

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.
GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

Ask for what you need, get exactly that...
Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less.
GraphQL queries always return predictable results.
Apps using GraphQL are fast and stable because they control the data they get, not the server.

Get many resources in a single request...
GraphQL queries access not just the properties of one resource but also smoothly follow references between them.
While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request.
Apps using GraphQL can be quick even on slow mobile network connections.

Describe what’s possible with a type system...
GraphQL APIs are organized in terms of types and fields, not endpoints.
Access the full capabilities of your data from a single endpoint. GraphQL uses types to ensure Apps only ask for what’s possible and provide clear and helpful errors.
Apps can use types to avoid writing manual parsing code.

Move faster with powerful developer tools...
Know exactly what data you can request from your API without leaving your editor, highlight potential issues before sending a query, and take advantage of improved code intelligence.
GraphQL makes it easy to build powerful tools like GraphiQL by leveraging your API’s type system.

Evolve your API without versions...
Add new fields and types to your GraphQL API without impacting existing queries.
Aging fields can be deprecated and hidden from tools.
By using a single evolving version, GraphQL APIs give apps continuous access to new features and encourage cleaner, more maintainable server code.

Bring your own data and code...
GraphQL creates a uniform API across your entire application without being limited by a specific storage engine.
Write GraphQL APIs that leverage your existing data and code with GraphQL engines available in many languages.
You provide functions for each field in the type system, and GraphQL calls them with optimal concurrency.

* ----------------------------------------

apollographql:
Apollo is the industry-standard GraphQL implementation, providing the data graph layer that connects modern apps to the cloud.

A better way to do APIs...
REST APIs are not a good fit for modern apps because they require large amounts of hard-to-manage data fetching code.
With Apollo, components simply declare their data requirements using GraphQL and Apollo gets the right data to the right place – with strong end-to-end typing that prevents bugs and boosts productivity.

All your data, managed in one place...
Apollo presents all of your organization’s data sources as one connected data graph that’s always up to date.
You can easily browse everything that’s available, join data across multiple sources, and get the results in the shape you need and on any platform.

Suited for a modern architecture...
Apollo is a great fit with microservice architectures and modern UI frameworks like React.
It serves as an abstraction layer that decouples services and apps so that each can be developed independently of the other, in any language and on any platform.

Build great experiences, faster...
Adding a data graph layer to your stack lets your team build new features – and bring your app to new platforms – in a fraction of the time.
App developers can delete thousands of lines of tedious boilerplate code, move fast without waiting on back-end teams, and more easily keep features consistent across web and mobile platforms.

* ----------------------------------------

{"project_name":"SpaceX-API","version":"3.1.0","project_link":"https://github.com/r-spacex/SpaceX-API","docs":"https://documenter.getpostman.com/view/2025350/RWaEzAiG","organization":"r/SpaceX","organization_link":"https://github.com/r-spacex","description":"Open Source REST API for rocket, core, capsule, pad, and launch data, created and maintained by the developers of the r/SpaceX organization"}

// ====================================================
dependencies:
		"apollo-boost": 							| apollo-client
		"apollo-link-schema": 				| apollo-link
		"apollo-server-express": 			| apollo-server
    "express":
    "express-graphql":
		"graphql": 										| graphql-js
		"graphql-query-complexity": 	| graphql-query-complexity
		"graphql-tools": 							| graphql-tools
		"react-apollo": 							| react-apollo
// ====================================================
devDependencies:
		"@apollo/react-testing": 		| https://github.com/apollographql/react-apollo
		"@types/graphql": 
// ====================================================
