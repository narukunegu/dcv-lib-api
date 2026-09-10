module.exports = {
  version: "26.9.10",
  port: 6314,
  sql: {
    user: "webA",
    password: "@bcD1234",
    server: "localhost",
    database: "DataThuVien",
    port: 1433,
    options: {
      trustServerCertificate: true,
    },
    requestTimeout: 10000,
    parseJSON: true,
  },
};
