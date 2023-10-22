//import sql from "mssql";
import sql from "mssql/msnodesqlv8.js";
//import sql from "msnodesqlv8";

/*
async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(
      "Server=cptsrvdevsql001,1433;Database=LYALL_TEMPDB;integrated Security=true;encrypt=false;trustServerCertificate=true"
    );
    const result = await sql.query`select top 10 * from User`;
    console.dir(result);
  } catch (err) {
    // ... error checks
    console.log(err);
  }configconfig
};
*/

// make sure that any items are correctly URL encoded in the connection string
/*
const connectionPool = new sql.ConnectionPool({
  //connectionString:
  //"Driver={SQL Server Native Client 11.0};Server=cptsrvdevsql001;Database=LYALL_TEMPDB;integrated Security=Yes;trustServerCertificate=Yes",
  connectionString:
    "server=cptsrvdevsql001;Database=LYALL_TEMPDB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}",

  options: {
    //encrypt: false,
    //trustServerCertificate: true,
  },
});
*/
const connectionString =
  "server=cptsrvdevsql001;Database=LYALL_TEMPDB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const query = "App_CandidateTask_GetByCandidate";

const connectionPool = new sql.ConnectionPool({
  connectionString,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});
const connection = await connectionPool.connect();

var sqlProc = "App_CandidateTask_GetByCandidate";
var request = new sql.Request(connection);

// sql.pa("CandidateId", sql.VarChar, 8820);

request.input("CandidateId", sql.Int, 8820);
request.input("MaxTotal", sql.Int, 9);
request.output("MaxTotal2", sql.Int);

const result = await request.execute(sqlProc);

await connection.close();

//console.log(request.parameters.MaxTotal.value);
console.log(result);

//sql.query(connectionString, query, (err, rows) => {
//  console.log(rows);
//});

/*

var sqlProc = "App_CandidateTask_GetByCandidate";
var request = new sql.Request(conn);

//const result = await sql.query`select top 10 * from User`;

const result = await sql.query(sqlProc);

console.log(result);
*/
