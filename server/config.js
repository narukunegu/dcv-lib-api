module.exports = {
  version: "26.11.2",
  port: 1903,
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
