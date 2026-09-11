"use strict";

const config = require("./config");
const server = require("./server");

const log = console.log;

const startServer = async () => {
  const { Chalk } = await import("chalk");
  const chalk = new Chalk();
  try {
    // create a instance of the server application
    const app = await server(config);

    // start the web server
    await app.start();
    console.log(
      chalk.green(
        `Server ${chalk.underline.bold(config.version)} successfully started on port ${chalk.underline.bold(config.port)}`,
      ),
    );
  } catch (err) {
    log(chalk.bgRed("ERR"), "Startup error:", err);
    process.exit(1);
  }
};

startServer();
