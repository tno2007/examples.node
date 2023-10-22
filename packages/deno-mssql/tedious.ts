import sql from "npm:tedious";

var config = {
  server: "cptsrvdevsql001", // or "localhost"
  database: "LYALL_TEMPDB",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  authentication: {
    type: "default",
    options: {
      userName: "Lyall",
      password: "password1234",
    },
  },
};

var connection = new sql.Connection(config);

// Setup event handler when the connection is established.
connection.on("connect", function (err) {
  if (err) {
    console.log("Error: ", err);
  }
  // If no error, then good to go...
  // executeStatement();
  console.log("we're good!");

  connection.disconnect();
});

// Initialize the connection.
connection.connect();
