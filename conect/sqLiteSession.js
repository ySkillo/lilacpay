import db from "./SQLiteDataBase";


db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // tx.executeSql("DROP TABLE Session;");
 //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  
  // Adicione uma nova tabela para armazenar informações da sessão do usuário
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS Session (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INT, token TEXT, loginTime INT, FOREIGN KEY(userId) REFERENCES User(id));"
  );


});

const startSession = (userId, token, loginTime) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Session (userId, token, loginTime) values (?, ?, ?);",
        [userId, token, loginTime],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error starting session");
        },
        (_, error) => reject(error)
      );
    });
  });
};

const endSession = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM Session;", [], (_, { rowsAffected }) => {
        resolve(rowsAffected);
      });
    });
  });
};

const getSession = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Session ORDER BY id DESC LIMIT 1;",
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export default {
  startSession,
  endSession,
  getSession,
};
