# universal-demo-nineteen-ts

* ----------------------------------------
* ----------------------------------------

https://reactjs.org/docs/test-utils.html
https://reactjs.org/docs/test-renderer.html
https://github.com/testing-library
https://jestjs.io/docs/en/tutorial-react
https://github.com/testing-library/react-testing-library
https://github.com/testing-library/react-hooks-testing-library

* ----------------------------------------
* ----------------------------------------

The fetch policy is an option which allows you to specify how you want your component to interact with the Apollo data cache. By default your component will try to read from the cache first, and if the full data for your query is in the cache then Apollo simply returns the data from the cache. If the full data for your query is not in the cache then Apollo will execute your request using your network interface. By changing this option you can change this behavior.

fetchPolicy values are:

    cache-first: 
    This is the default value where we always try reading data from your cache first. If all the data needed to fulfill your query is in the cache then that data will be returned. Apollo will only fetch from the network if a cached result is not available. This fetch policy aims to minimize the number of network requests sent when rendering your component.

    cache-and-network: 
    This fetch policy will have Apollo first trying to read data from your cache. If all the data needed to fulfill your query is in the cache then that data will be returned. However, regardless of whether or not the full data is in your cache this fetchPolicy will always execute query with the network interface unlike cache-first which will only execute your query if the query data is not in your cache. This fetch policy optimizes for users getting a quick response while also trying to keep cached data consistent with your server data at the cost of extra network requests.

    network-only: 
    This fetch policy will never return you initial data from the cache. Instead it will always make a request using your network interface to the server. This fetch policy optimizes for data consistency with the server, but at the cost of an instant response to the user when one is available.

    cache-only: 
    This fetch policy will never execute a query using your network interface. Instead it will always try reading from the cache. If the data for your query does not exist in the cache then an error will be thrown. This fetch policy allows you to only interact with data in your local client cache without making any network requests which keeps your component fast, but means your local data might not be consistent with what is on the server. If you are interested in only interacting with data in your Apollo Client cache also be sure to look at the readQuery() and readFragment() methods available to you on your ApolloClient instance.

    no-cache: 
    This fetch policy will never return your initial data from the cache. Instead it will always make a request using your network interface to the server. Unlike the network-only policy, it also will not write any data to the cache after the query completes.

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
https://github.com/FormidableLabs/inspectpack/issues/132
