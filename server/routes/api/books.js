module.exports.register = async (server) => {
  const Boom = require("@hapi/boom");
  const Joi = require("@hapi/joi");
  const { Chalk } = await import("chalk");
  const chalk = new Chalk();
  server.route({
    method: "GET",
    path: "/api/books",
    config: {
      validate: {
        query: Joi.object({
          q: Joi.string().allow("").optional(),
          page: Joi.number().integer().min(1).optional(),
          limit: Joi.number().integer().min(1).max(100).optional(),
        }),
      },
      handler: async (request) => {
        try {
          // get the sql client registered as a plugin
          const db = request.server.plugins.sql.client;

          // get search query
          const query = request.query;

          // execute the query
          const start = Date.now();
          const res = await db.books.search(query);
          console.log(
            chalk.bgGreen(`${(Date.now() - start) / 1000}s`),
            `${chalk.underline(new Date().toLocaleString())}: Get ${chalk.bold(res.books.length)} books for request '${chalk.blue.bold(query.q)}'`,
          );

          return res;
        } catch (err) {
          server.log(["error", "api", "books"], err);
          throw Boom.internal("An error occurred while fetching books");
        }
      },
    },
  });

  server.route({
    method: "GET",
    path: "/api/books/new",
    config: {
      handler: async (request) => {
        try {
          // get the sql client registered as a plugin
          const db = request.server.plugins.sql.client;

          // execute the query
          const start = Date.now();
          const res = await db.books.getNew();
          console.log(
            chalk.bgGreen(`${(Date.now() - start) / 1000}s`),
            `${chalk.underline(new Date().toLocaleString())}: Get ${chalk.bold(res.books.length)} new books`,
          );

          return res;
        } catch (err) {
          server.log(["error", "api", "books"], err);
          throw Boom.internal("An error occurred while fetching new books");
        }
      },
    },
  });

  server.route({
    method: "GET",
    path: "/api/book/{id}",
    config: {
      validate: {
        params: Joi.object({
          id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        }),
      },
      handler: async (request) => {
        try {
          // get the sql client registered as a plugin
          const db = request.server.plugins.sql.client;

          // get search query
          const query = request.params.id;

          // execute the query
          const start = Date.now();
          const res = await db.books.getDetail(query);
          console.log(
            chalk.bgGreen(`${(Date.now() - start) / 1000}s`),
            `${chalk.underline(new Date().toLocaleString())}: Get full detail of Book ${chalk.bold(query)}`,
          );

          return res;
        } catch (err) {
          server.log(["error", "api", "books"], err);
          throw Boom.internal("An error occurred while fetching book details");
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
