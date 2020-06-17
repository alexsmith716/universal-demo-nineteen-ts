import axios from 'axios';
// import config from 'config';

export default function apiClient(req) {

	console.log('>>>> apiClient > REQ > IncomingMessage: ', req);

	const instance = axios.create();

	instance.interceptors.request.use(
		conf => {

			console.log('>>>> apiClient > process.env.IS_CLIENT: ', process.env.IS_CLIENT);

			return conf;
		},
		error => Promise.reject(error)
	);

	instance.interceptors.response.use(
		response => response.data,
		error => Promise.reject(error.response ? error.response.data : error)
	);

	console.log('>>>> apiClient > INSTANCE: ', instance);

	return instance;
}
