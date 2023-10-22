// main.ts
import sql from "npm:mssql";
import a from "npm:mssql";

const connectionString =
  "server=cptsrvdevsql001;Database=LYALL_TEMPDB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const query = "App_CandidateTask_GetByCandidate";

const config = {
  user: "Lyall",
  password: "password1234",
  server: "cptsrvdevsql001",
  database: "LYALL_TEMPDB",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const connection = await sql.connect(config);

const sqlProc = "App_CandidateTask_GetByCandidate";
const request = connection.query(sqlProc);

// sql.pa("CandidateId", sql.VarChar, 8820);

request.input("CandidateId", sql.Int, 8820);
request.input("MaxTotalIn", sql.Int, 9);
request.output("MaxTotalOut", sql.Int);

const result = await request.execute(sqlProc);

await connection.close();

//console.log(request.parameters.MaxTotal.value);
console.log(result);
