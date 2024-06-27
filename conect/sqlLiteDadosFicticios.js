import db from "./SQLiteDataBase";

// Código para criar as tabelas e adicionar a coluna deletedAt se necessário
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // tx.executeSql("DROP TABLE DadosFicticios;");
  // tx.executeSql("DROP TABLE DeletedInvoices;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  // Criação da tabela DadosFicticios
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS DadosFicticios (id INTEGER PRIMARY KEY AUTOINCREMENT, payerName TEXT, payerDocument TEXT, recipientName TEXT, recipientDocument TEXT, amount REAL, userId INTEGER, FOREIGN KEY(userId) REFERENCES User(id));"
  );

  // Criação da tabela DeletedInvoices
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS DeletedInvoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      faturaId INTEGER, 
      payerName TEXT, 
      payerDocument TEXT, 
      recipientName TEXT, 
      recipientDocument TEXT, 
      amount REAL, 
      userId INTEGER,
      deletedAt TEXT,
      FOREIGN KEY(faturaId) REFERENCES DadosFicticios(id)
    );`
  );

  // Adicionar a coluna deletedAt se ela não existir
  tx.executeSql(
    "PRAGMA table_info(DeletedInvoices);",
    [],
    (_, { rows }) => {
      const columns = rows._array;
      const columnNames = columns.map(column => column.name);
      if (!columnNames.includes('deletedAt')) {
        tx.executeSql("ALTER TABLE DeletedInvoices ADD COLUMN deletedAt TEXT;");
      }
    },
    (_, error) => {
      console.error('Erro ao verificar/alterar tabela:', error);
    }
  );
});



const insertFictitiousData = (fictitiousData) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO DadosFicticios (payerName, payerDocument, recipientName, recipientDocument, amount, userId) VALUES (?, ?, ?, ?, ?, ?);',
        [fictitiousData.payerName, fictitiousData.payerDocument, fictitiousData.recipientName, fictitiousData.recipientDocument, fictitiousData.amount, fictitiousData.userId],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log('Fictitious data saved successfully!');
            resolve();
          } else {
            console.error('Error saving fictitious data.');
            reject(new Error('Error saving fictitious data.'));
          }
        },
        (_, error) => {
          console.error('Error executing SQL:', error);
          reject(error);
        }
      );
    });
  });
};

const loadFictitiousData = (userId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM DadosFicticios WHERE userId = ?;', // Adiciona a cláusula WHERE para filtrar os dados pelo userId
        [userId],
        (_, result) => {
          const fictitiousData = [];
          for (let i = 0; i < result.rows.length; ++i) {
            fictitiousData.push(result.rows.item(i));
          }
          console.log('Fictitious data loaded successfully:', fictitiousData);
          resolve(fictitiousData);
        },
        (_, error) => {
          console.error('Error executing SQL:', error);
          reject(error);
        }
      );
    });
  });
};

// Função para excluir uma fatura do banco de dados
const deleteFatura = (faturaId, userId, callback) => {
  const deletedAt = new Date().toISOString(); // Adiciona a data de exclusão atual
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM DadosFicticios WHERE id = ? AND userId = ?;',
      [faturaId, userId],
      (_, selectResult) => {
        if (selectResult.rows.length > 0) {
          const fatura = selectResult.rows.item(0);
          tx.executeSql(
            `INSERT INTO DeletedInvoices (faturaId, payerName, payerDocument, recipientName, recipientDocument, amount, userId, deletedAt) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
            [fatura.id, fatura.payerName, fatura.payerDocument, fatura.recipientName, fatura.recipientDocument, fatura.amount, fatura.userId, deletedAt],
            (_, insertResult) => {
              if (insertResult.rowsAffected > 0) {
                tx.executeSql(
                  'DELETE FROM DadosFicticios WHERE id = ? AND userId = ?;',
                  [faturaId, userId],
                  (_, deleteResult) => {
                    if (deleteResult.rowsAffected > 0) {
                      console.log('Fatura excluída com sucesso!');
                      if (callback) {
                        callback();
                      }
                    } else {
                      console.error('Erro ao excluir a fatura.');
                    }
                  },
                  (_, error) => {
                    console.error('Erro ao executar o SQL:', error);
                  }
                );
              } else {
                console.error('Erro ao salvar o ID da fatura excluída.');
              }
            },
            (_, error) => {
              console.error('Erro ao executar o SQL:', error);
            }
          );
        } else {
          console.error('Fatura não encontrada ou não pertence ao usuário.');
        }
      },
      (_, error) => {
        console.error('Erro ao executar o SQL:', error);
      }
    );
  });
};



// Função para carregar os IDs da tabela DeletedInvoices
// Função para carregar os IDs da tabela DeletedInvoices
const loadDeletedInvoices = (userId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM DeletedInvoices WHERE userId = ?;',
        [userId],
        (_, result) => {
          const deletedInvoices = [];
          for (let i = 0; i < result.rows.length; ++i) {
            deletedInvoices.push(result.rows.item(i));
          }
          console.log('Deleted invoices loaded successfully:', deletedInvoices);
          resolve(deletedInvoices);
        },
        (_, error) => {
          console.error('Erro ao executar o SQL:', error);
          reject(error);
        }
      );
    });
  });
};


export default {
  insertFictitiousData,
  loadFictitiousData,
  deleteFatura,
  loadDeletedInvoices,
};
