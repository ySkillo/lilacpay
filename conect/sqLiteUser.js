import db from "./SQLiteDataBase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */

db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // tx.executeSql("DROP TABLE User;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, telefone INT, cpf INT, dataNascimento INT, codigo INT NULL, senha TEXT);"
  );
});

const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // comando SQL modificável
      tx.executeSql(
        "INSERT INTO User (id, nome, email, telefone, cpf, dataNascimento, senha) values (?, ?, ?, ?, ?, ?, ?);",
        [obj.id, obj.nome, obj.email, obj.telefone, obj.cpf, obj.dataNascimento, obj.senha],

        // função de callback
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // comando SQL modificável
      tx.executeSql(
        "SELECT * FROM User;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const checkCredentials = (cpf, senha) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM User WHERE cpf = ? AND senha = ?',
        [cpf, senha],
        (_, { rows }) => {
          if (rows.length > 0) {
            // Credenciais válidas
            const { id, nome, cpf } = rows.item(0);
            resolve({ id, nome, cpf });
          } else {
            // Credenciais inválidas
            reject(new Error('Credenciais inválidas'));
          }
        },
        (_, error) => {
          // Erro ao executar a consulta SQL
          reject(error);
        }
      );
    });
  });
};

const getUsuarioById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT u.*, r.valor AS renda FROM User u LEFT JOIN Renda r ON u.id = r.userId WHERE u.id = ?',
        [id],
        (_, { rows }) => {
          if (rows.length > 0) {
            const usuario = rows.item(0);
            resolve(usuario);
          } else {
            reject(new Error('Usuário não encontrado'));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const updateCodigo = (id, codigo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE User SET codigo = ? WHERE id = ?',
        [codigo, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(true);
          } else {
            reject(new Error('Erro ao atualizar o código. Usuário não encontrado.'));
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
  create,
  all,
  checkCredentials,
  getUsuarioById,
  updateCodigo,
};
