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

  const getNew = async () => {
    const cnx = await getConnection();
    const request = await cnx.request();

    request.stream = false;

    var result = [];

    await request
      .query(sqlQueries.getNew)
      .then((res) => {
        result = res.recordset[0] || [];
      })
      .catch((err) => {
        closePool();
        throw err;
      });

    return {
      books: result,
    };
  };

  return {
    search,
    getDetail,
    getNew,
  };
};

module.exports = { register };
