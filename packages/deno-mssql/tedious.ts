//import sql from "npm:tedious";
import { Connection, Request, TYPES } from "npm:tedious";

const config = {
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

const connection = new Connection(config);

const param = (paramType: string) => {
	switch (paramType) {
		case "VarChar":
			return TYPES.VarChar;
		case "NVarChar":
			return TYPES.NVarChar;
		case "Text":
			return TYPES.Text;
		case "Int":
			return TYPES.Int;
		case "BigInt":
			return TYPES.BigInt;
		case "TinyInt":
			return TYPES.TinyInt;
		case "SmallInt":
			return TYPES.SmallInt;
		case "Bit":
			return TYPES.Bit;
		case "Float":
			return TYPES.Float;
		case "Numeric":
			return TYPES.Numeric;
		case "Decimal":
			return TYPES.Decimal;
		case "Real":
			return TYPES.Real;
		case "Date":
			return TYPES.Date;
		case "DateTime":
			return TYPES.DateTime;
		case "DateTime2":
			return TYPES.DateTime2;
		case "DateTimeOffset":
			return TYPES.DateTimeOffset;
		case "SmallDateTime":
			return TYPES.SmallDateTime;
		case "Time":
			return TYPES.Time;
		case "UniqueIdentifier":
			return TYPES.UniqueIdentifier;
		case "SmallMoney":
			return TYPES.SmallMoney;
		case "Money":
			return TYPES.Money;
		case "Binary":
			return TYPES.Binary;
		case "VarBinary":
			return TYPES.VarBinary;
		case "Image":
			return TYPES.Image;
		case "Xml":
			return TYPES.Xml;
		case "Char":
			return TYPES.Char;
		case "NChar":
			return TYPES.NChar;
		case "NText":
			return TYPES.NText;
		case "TVP":
			return TYPES.TVP;
		case "UDT":
			return TYPES.UDT;
		//case "Geography":
		//	return TYPES.Geography;
		//case "Geometry":
		//	return TYPES.Geometry;
		case "Variant":
			return TYPES.Variant;
	}
};

const executeTextAsync = (connection: Connection, sqlCommand: string) => {
	return new Promise((resolve, reject) => {
		const recordset: IAnyKey[] = [];

		const request = new Request(sqlCommand, (err, rowCount) => {
			if (err) {
				reject(err);
			} else {
				resolve(recordset);
			}
			connection.close();
		});

		request.on("row", (columns) => {
			const rowData: IAnyKey = {};

			for (const column of columns) {
				const colName = column.metadata.colName;
				const colValue = column.value;

				rowData[colName] = colValue;
			}

			recordset.push(rowData);
		});

		connection.on("connect", (err) => {
			if (err) {
				reject(err);
			} else {
				connection.execSql(request);
			}
		});
		connection.connect();
	});
};

const executeSpAsync = (
	connection: Connection,
	spName: string,
	spParams: IProcParam[] = [],
) => {
	return new Promise((resolve, reject) => {
		const recordset: IAnyKey[] = [];

		const request = new Request(spName, (err, rowCount) => {
			if (err) {
				reject(err);
			} else {
				resolve(recordset);
			}
			connection.close();
		});

		for (const p of spParams) {
			let parameterType = param(p.type);

			if (!p.type || !parameterType) {
				// test for guids				
				if (isUuid(p.value)) {
					parameterType = TYPES.UniqueIdentifier;
				} else {
					parameterType = Number.isNaN(p.value) ? TYPES.NVarChar : TYPES.Int;
				}
			}

			switch (p.direction) {
				case "out":
					request.addOutputParameter(p.name, parameterType, p.value);
					break;
				default:
					request.addParameter(p.name, parameterType, p.value);
					break;
			}
		}

		request.on("row", (columns) => {
			const rowData: IAnyKey = {};

			for (const column of columns) {
				const colName = column.metadata.colName;
				const colValue = column.value;

				rowData[colName] = colValue;
			}

			recordset.push(rowData);
		});

		connection.on("connect", (err) => {
			if (err) {
				reject(err);
			} else {
				connection.callProcedure(request);
			}
		});

		connection.on("error", (err) => {
			console.log("--- error ---");
			console.error(err);
		});

		connection.on("errorMessage", (err) => {
			console.log("--- errorMessage ---");
			console.error(err);
		});

		connection.connect();
	});
};

const main = async () => {
	//const recordset = await executeTextAsync(connection, "SELECT 1 AS A");

	const spParams = [
		{
			name: "VuiCRMGuid",
			type: "UniqueIdentifier",
			value: "42397325-17A1-EC11-811D-0050560111DA"
		}
	];

	const recordset = await executeSpAsync(connection, "[GroupData].dbo.pGLGetBIPartnerTeamDetails", spParams);

	console.log(recordset);
}

const spParams = [
	{
		name: "VuiCRMGuid",
		type: "UniqueIdentifier",
		value: "42397325-17A1-EC11-811D-0050560111DA"
	}
];

//const recordset = await executeSpAsync(connection, "[GroupData].dbo.pGLGetBIPartnerTeamDetails", spParams);
const recordset = await executeSpAsync(connection, "dbo.App_Candidate_Get");
// [App_Candidate_Get]

if (recordset.length) {

	const row = recordset[0];

	// await Deno.writeFile("hello.jpg", row.Image, { mode: 0o644 });

	console.log(row);

}

console.log(recordset);

