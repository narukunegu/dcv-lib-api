const Hapi = require("@hapi/hapi");
const plugins = require("./plugins");
const routes = require("./routes");
const { join } = require("path");

const app = async (config) => {
  const { port } = config;

  // create an instance of hapi
  const server = Hapi.server({
    port,
    routes: {
      cors: {
        origin: ["*"],
      },
      files: {
        relativeTo: join(__dirname, ".."),
      },
    },
  });

  // store the config for later use
  server.app.config = config;

  // register plugins
  await plugins.register(server);

  // register routes
  await routes.register(server);

  //load book covers
  if (process.env.NODE_ENV === "production") {
    await server.plugins.sql.client.books.init();
    const { Chalk } = await import("chalk");
    const chalk = new Chalk();
    console.log(
      chalk.green(
        `Server ${chalk.underline.bold(config.version)} successfully started on port ${chalk.underline.bold(port)}`,
      ),
    );
  } else {
    const { Chalk } = await import("chalk");
    const chalk = new Chalk();
    console.log(
      chalk.green(
        `Server ${chalk.underline.bold(config.version)} successfully started on port ${chalk.underline.bold(port)}`,
      ),
    );
  }

  return server;
};

module.exports = app;
