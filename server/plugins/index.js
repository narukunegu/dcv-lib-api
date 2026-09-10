const Inert = require('@hapi/inert');
const sql = require( "./sql" );

module.exports.register = async server => {
  // register plugins
  await server.register( [ Inert, sql ] );
};