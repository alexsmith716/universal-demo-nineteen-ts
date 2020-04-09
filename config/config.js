const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT || 3000}/dist`,
  },
  production: {
    isProduction: true,
    assetsPath: '/dist',
  },
}[process.env.NODE_ENV || 'development'];

const config = {
  faviconPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT || 3000}/favicon.ico`,
  mongoDBmongooseURL: 'mongodb://localhost:27017/apptest2020',
  mongoDBsessionURL: 'mongodb://localhost:27017/apptest2020s',
  mongoLabURL: 'mongodb://localhost/apptest2020mlab',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3030,
  sessionSecret: process.env.SESSION_SECRET || 'erferververvrt54545vfrvrvrvrtvrt',
  sessionExpiration: 6 * 60 * 60 * 1000, // 6 hours
  app: {
    head: {
      title: 'Election App 2020!',
      titleTemplate: 'ThisGreatApp!: %s',
      meta: [
        { name: 'description', content: 'The Primary is right around the corner!' },
        { charset: 'UTF-8' },
        { property: 'og:site_name', content: 'ThisGreatApp!' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'ThisGreatApp!' },
        { property: 'og:description', content: 'The Primary is right around the corner!' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: 'dev' },
        { property: 'og:creator', content: 'dev' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' },
      ],
    },
    csp: {
      directives: {
        'connect-src': [],
        'default-src': [],
        'manifest-src': [],
        'frame-src': [],
        'script-src': [],
        'style-src': [],
        'img-src': [],
        'font-src': [],
        'object-src': [],
        'block-all-mixed-content': true,
        'frame-ancestors': [],
      },
    },
  },
};

Object.assign(config, environment);
export default config;
