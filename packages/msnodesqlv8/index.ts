import tedious from "npm:tedious";

const connectionString =
  "server=cptsrvdevsql001;Database=LYALL_TEMPDB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

const query = "App_CandidateTask_GetByCandidate";

const pool = new sql.Pool({
  connectionString,
});

await pool.promises.open();

const p = await pool.promises.query(query);

const res = pool.promises.callProc("App_CandidateTask_GetByCandidate", {
  CandidateId: 8820,
});

console.log(res);
