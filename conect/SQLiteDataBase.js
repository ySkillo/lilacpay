import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase("db.db")

db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  //tx.executeSql("DROP TABLE User;");
 //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>


//tx.executeSql("DROP TABLE Session;");
// Adicione uma nova tabela para armazenar informações da sessão do usuário


// tx.executeSql("DROP TABLE Renda;");
// Crie a tabela de renda


});

export default db


//npm install expo-sqlite@13.2.2
