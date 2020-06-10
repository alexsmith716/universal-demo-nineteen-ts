import { Headers as ServerHeaders } from 'node-fetch';

//	fetch-headers
//	https://github.com/apollographql/apollo-link-rest/blob/master/docs/rest.md
//	https://github.com/apollographql/apollo-client/blob/master/docs/source/api/link/apollo-link-rest.md
//	https://github.com/apollographql/apollo-client/tree/master/docs/source/api/link/apollo-link-context.md

//	patch the 'global object' in node:
//	https://github.com/node-fetch/node-fetch/#loading-and-configuring-the-module

function defineHeaders() {
	global.Headers = process.env.IS_CLIENT ? global.Headers : ServerHeaders;
}

export default defineHeaders;
