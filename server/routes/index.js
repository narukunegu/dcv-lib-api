const api = require("./api");

module.exports.register = async (server) => {
  // register api routes
  await api.register(server);

  // remove index page
  //server.route({
  //  method: 'GET',
  //  path: '/{param*}',
  //  handler: {
  //    directory: {
  //      path: 'dist',
  //      redirectToSlash: true,
  //      index: ['index.html']
  //    }
  //  }
  //});

  //server.route({
  //  method: 'GET',
  //  path: '/books',
  //  handler: async (request, h) => {
  //    return h.redirect('/')
  //  }
  //});

  server.route({
    method: "GET",
    path: "/api/background/{filename}",
    handler: {
      file: (request) => {
        return `./assets/backgrounds/${request.params.filename}`;
      },
    },
  });
};
