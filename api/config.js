const ONE_DAY = 60 * 60 * 24 * 1000;
// const cookieExpireDate = new Date( Date.now() + 14 * 24 * 60 * 60 );
// 1 hour(s)
// const cookieExpireDate = 6 * 60 * 60 * 1000;
// 1 minute
// const cookieExpireDate = 1 * 60 * 1000;
// 10 minutes
// const cookieExpireDate = 10 * 60 * 1000;
// 6 hours
// const cookieExpireDate = 6 * 60 * 60 * 1000;

const config = {
	auth: {
		secret: 'kg58gdsbmH6qwGc8b@',
		cookie: {
			enabled: true, // whether cookie creation is enabled
			httpOnly: false, // when enabled, prevents the client from reading the cookie.
			maxAge: ONE_DAY,
			secure: process.env.NODE_ENV === 'production', // whether cookies should only be available over HTTPS
		},
		// facebook: {
		//   path: '/auth/facebook',
		//   clientID: '',
		//   clientSecret: '',
		//   permissions: {
		//     authType: 'rerequest'
		//   },
		//   scope: ['public_profile', 'email'],
		//   profileFields: ['id', 'displayName', 'photos', 'email', 'first_name', 'last_name', 'age_range'],
		//   accessTokenField: 'accessToken'
		// }
	},
};

export default config;
