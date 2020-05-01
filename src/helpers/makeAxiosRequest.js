import axios from 'axios';

export default async function makeAxiosRequest(uri, options) {
	const config = {
		url: 'http://localhost:4000/graphql', 
		method: 'post', 
		headers: options.headers, 
		data: options.body
	}
	console.log('CONFIG: ', config);
	try {
		let response = await axios(config)
		console.log('response.data.data: ', response.data.data);
		return response.data.data
	} catch (error) {
		console.log('error: ',error);
	}
}
