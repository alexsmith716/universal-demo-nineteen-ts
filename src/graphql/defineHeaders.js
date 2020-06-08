import { Headers as ServerHeaders } from 'node-fetch';

// fetch-headers
// https://github.com/apollographql/apollo-link-rest/blob/master/docs/rest.md
// https://github.com/apollographql/apollo-client/blob/master/docs/source/api/link/apollo-link-rest.md
// https://github.com/apollographql/apollo-client/tree/master/docs/source/api/link/apollo-link-context.md

function defineHeaders() {
	//	console.log('>>>> defineHeaders > process.env.IS_CLIENT: ', process.env.IS_CLIENT);
  global.Headers = process.env.IS_CLIENT ? global.Headers : ServerHeaders;
}

export default defineHeaders;