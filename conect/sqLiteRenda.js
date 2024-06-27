import db from "./SQLiteDataBase";


db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // tx.executeSql("DROP TABLE Renda;");
 //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
 tx.executeSql(
  "CREATE TABLE IF NOT EXISTS Renda (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INT, valor REAL, FOREIGN KEY(userId) REFERENCES User(id));"
);


});

const insertRenda = (userId, valorRenda) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Renda (userId, valor) VALUES (?, ?);',
        [userId, valorRenda],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log('Renda salva com sucesso!');
            resolve(result.insertId); // Retorna o ID da renda inserida
          } else {
            console.error('Erro ao salvar renda.');
            reject(new Error('Erro ao salvar renda.'));
          }
        },
        (_, error) => {
          console.error('Erro ao executar SQL:', error);
          reject(error);
        }
      );
    });
  });
};

const updateRenda = (userId, novoSaldo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE Renda SET valor = ? WHERE userId = ?;',
        [novoSaldo, userId],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log('Saldo atualizado com sucesso!');
            resolve();
          } else {
            console.error('Erro ao atualizar saldo.');
            reject(new Error('Erro ao atualizar saldo.'));
          }
        },
        (_, error) => {
          console.error('Erro ao executar SQL:', error);
          reject(error);
        }
      );
    });
  });
};








export default {
  insertRenda,
  updateRenda,
};
