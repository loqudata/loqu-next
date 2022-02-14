import { DuckDBSingleton, initializeDuckDB } from "./init";

import { Table } from "apache-arrow";
import arrow from "./simpleArrow";
import SqlString from "sqlstring";

export async function loadCSVFile(file: File, tableName: string) {
  const globalDB = await DuckDBSingleton.getInstance();
  const connDB = await globalDB.connect();

  await globalDB.registerFileHandle(
    file.name,
    file
    // "http://localhost:8080/small.csv"
  );
  
  //SqlString adds the quotes for us
  const tbQuery = `CREATE TABLE ${SqlString.escape(tableName)} AS SELECT * FROM read_csv_auto(${SqlString.escape(file.name)}, SAMPLE_SIZE=-1);`
  console.log(tbQuery);
  
  await connDB.query(
    tbQuery
  );
}

export async function query(query: string) {
  const globalDB = await DuckDBSingleton.getInstance();
  const connDB = await globalDB.connect();

  const result = await connDB.query(query);
  
  console.log(`Query resulted in ${result.numCols} cols, ${result.length} rows`); 

  return result
}
