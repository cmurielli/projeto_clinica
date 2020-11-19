const oracledb = require('oracledb'); //importo a biblioteca
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;//formata alguma coisa

const dbConfig = require('./config.js'); //importa os dados do config
const tables = require('./tables');

const createTables = async () => { //função assincrona que cria uma variável que se conecta com o banco por meio de um try 
  let connection;

  try {
    // Get a non-pooled connection
    connection = await oracledb.getConnection(dbConfig);
    tables.map(async (t) => { //um array
      try {
        await connection.execute(t,  { autoCommit: true }); //executa um comando sql
      } catch(e) {}
    });
    console.log('The tables were created');

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

const insert = async (stmts) => { //recebe um parametro 

  let connection;

  try {
    // Get a non-pooled connection
    connection = await oracledb.getConnection(dbConfig);
    console.log("insert")
    stmts.map(async (s) => {
      try {
        await connection.execute(s,  { autoCommit: true });
      } catch(e) {
        if (e.errorNum != 942)
          console.error(e);
      }
    })
    console.log('Connection was successful!');

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

const select = async (stmts) => {
  console.log('select')
  let connection, result;

  try {
    console.log("aqui")
    // Get a non-pooled connection
    connection = await oracledb.getConnection(dbConfig);

    try {
      console.log(stmts)
      result = await connection.execute(stmts);
      console.log(result)
    } catch(e) {
      if (e.errorNum != 942)
        console.error(e);
    }
  
    console.log('Connection was successful!');
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        return result.rows;
      } catch (err) {
        console.error(err);
      }
    }
  }
};

module.exports = {createTables, select, insert} //exporta os 3 modulos