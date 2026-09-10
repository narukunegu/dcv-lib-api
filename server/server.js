const Hapi = require('@hapi/hapi');
const plugins = require( "./plugins" );
const routes = require( "./routes" );
const { join } = require( "path" );

const app = async config => {
  const { port } = config;

  // create an instance of hapi
  const server = Hapi.server( {
    port,
    routes: {
      files: {
        relativeTo: join(__dirname, '..')
      }
    }
  });

  // store the config for later use
  server.app.config = config;

  // register plugins
  await plugins.register( server );

  // register routes
  await routes.register( server );

  //load book covers
  //console.log('On dev')
  await server.plugins.sql.client.books.init(config);

  return server;
};

module.exports = app;