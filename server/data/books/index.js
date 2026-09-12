"use strict";

const { Buffer } = require("buffer");
const utils = require("../utils");
const sharp = require("sharp");
const Fuse = require("fuse.js");
const cliProgress = require("cli-progress");

const register = async ({ sql, getConnection, closePool }) => {
  // read in all the .sql files for this folder
  const sqlQueries = await utils.loadSqlQueries("books");

  const search = async ({ q }) => {
    const cnx = await getConnection();
    const request = await cnx.request();

    request.stream = false;

    request.input(
      "q",
      sql.NVarChar(200),
      q
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/ /g, "%"),
    );

    var result = [];

    await request
      .query(sqlQueries.getBooks)
      .then((res) => {
        result = res.recordset[0] || [];
      })
      .catch((err) => {
        closePool();
        throw err;
      });

    //sort result
    const fuse = new Fuse(result, {
      //useExtendedSearch: true,
      keys: [
        {
          name: "NS.Tua",
          weight: 10,
        },
        {
          name: "So Tai san",
          weight: 5,
        },
        {
          name: "NS.TenTgia",
          weight: 2,
        },
        {
          name: "NS.HoTgia",
          weight: 2,
        },
        {
          name: "NS.Chude",
          weight: 1,
        },
      ],
    });

    return {
      books: fuse.search(
        q
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D"),
      ),
    };
  };

  const getDetail = async (q) => {
    const cnx = await getConnection();
    const request = await cnx.request();

    request.stream = false;

    request.input("q", sql.NVarChar(200), q);

    var result = [];

    await request
      .query(sqlQueries.getDetail)
      .then((res) => {
        result = res.recordset[0] || [];
      })
      .catch((err) => {
        closePool();
        throw err;
      });

    return {
      book: result[0],
    };
  };

  const init = async ({ version, port }) => {
    const cnx = await getConnection();
    const request = await cnx.request();

    //const { Chalk } = await import("chalk");
    //const chalk = new Chalk();

    //try {
    //  console.log("Loading data...");
    //  const bar = new cliProgress.SingleBar(
    //    {},
    //    cliProgress.Presets.shades_classic,
    //  );

    //  var total = 0;
    //  await request
    //    .query(
    //      "SELECT count([So Tai san]) AS [total] FROM [DataThuVien].[dbo].[Sach] WHERE [BiaSach] IS NOT NULL",
    //    )
    //    .then((res) => {
    //      total = res.recordset[0]["total"];
    //    });

    //  bar.start(total, 0);

    //  request.stream = true;

    //  request.query(sqlQueries.loadCovers);

    //  await request.on("row", (book) => {
    //    // Emitted for each row in a recordset
    //    request.pause();

    //    sharp(Buffer.from(book["BiaSach"], "base64"))
    //      .jpeg({
    //        quality: 100,
    //        chromaSubsampling: "4:4:4",
    //      })
    //      .toFile(`./assets/books/cover/${book["So Tai san"]}.jpg`)
    //      .catch((err) => {
    //        console.log(`\n`, err);
    //      });

    //    bar.increment();
    //    request.resume();
    //  });

    //  request.on("done", () => {
    //    // Always emitted as the last one
    //    bar.stop();
    //    console.log(
    //      chalk.green(
    //        `Server ${chalk.underline.bold(version)} successfully started on port ${chalk.underline.bold(port)}`,
    //      ),
    //    );
    //  });
    //} catch (err) {
    //  await closePool();
    //  throw err;
    //}
  };

  return {
    search,
    getDetail,
    // init,
  };
};

module.exports = { register };
