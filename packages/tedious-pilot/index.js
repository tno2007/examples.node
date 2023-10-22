//var Connection = require("../lib/tedious").Connection;
//var Request = require("../lib/tedious").Request;

import { Connection, Request } from "tedious";

var config = {
  server: "cptsrvdevsql001",
  authentication: {
    type: "default",
    options: {
      userName: "Lyall",
      password: "password1234",
    },
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const connection = new Connection(config);

console.log("connection:", connection);
/**/
connection.connect((err) => {
  if (err) {
    console.log("Connection Failed");
    throw err;
  }

  executeStatement();
});

function executeStatement() {
  const request = new Request("select * from MyTable", (err, rowCount) => {
    if (err) {
      throw err;
    }

    console.log("DONE!");
    connection.close();
  });

  // Emits a 'DoneInProc' event when completed.
  request.on("row", (columns) => {
    columns.forEach((column) => {
      if (column.value === null) {
        console.log("NULL");
      } else {
        console.log(column.value);
      }
    });
  });

  request.on("done", (rowCount) => {
    console.log("Done is called!");
  });

  request.on("doneInProc", (rowCount, more) => {
    console.log(rowCount + " rows returned");
  });

  // In SQL Server 2000 you may need: connection.execSqlBatch(request);
  connection.execSql(request);
}
