module.exports.register = async (server) => {
  const { Chalk } = await import("chalk");
  const chalk = new Chalk();
  server.route({
    method: "GET",
    path: "/api/books",
    config: {
      handler: async (request) => {
        try {
          // get the sql client registered as a plugin
          const db = request.server.plugins.sql.client;

          // get search query
          const query = request.query;

          // execute the query
          var start = Date.now();
          const res = await db.books.search(query);
          console.log(
            chalk.bgGreen(`${(Date.now() - start) / 1000}s`),
            `${chalk.underline(new Date().toLocaleString())}: Get ${chalk.bold(res.books.length)} books for request '${chalk.blue.bold(query.q)}'`,
          );

          return res;
        } catch (err) {
          server.log(["error", "api", "books"], err);
        }
      },
    },
  });

  server.route({
    method: "GET",
    path: "/api/book/{id}",
    config: {
      handler: async (request) => {
        try {
          // get the sql client registered as a plugin
          const db = request.server.plugins.sql.client;

          // get search query
          const query = request.params.id;

          // execute the query
          var start = Date.now();
          const res = await db.books.getDetail(query);
          console.log(
            chalk.bgGreen(`${(Date.now() - start) / 1000}s`),
            `${chalk.underline(new Date().toLocaleString())}: Get full detail of Book ${chalk.bold(query)}`,
          );

          return res;
        } catch (err) {
          server.log(["error", "api", "books"], err);
        }
      },
    },
  });
  server.route({
    method: "GET",
    path: "/api/books/cover/{filename}",
    handler: {
      file: (request) => {
        return `./assets/books/cover/${request.params.filename}`;
      },
    },
  });
};
