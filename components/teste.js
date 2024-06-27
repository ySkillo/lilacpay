import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('meuBancoDeDados.db');

const PaginaLogin = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = () => {
    // Verifica as credenciais do usuário
    // Simula a verificação de credenciais de forma simplificada
    if (usuario === 'usuario' && senha === 'senha') {
      // Insere os dados da sessão na tabela 'sessao'
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO sessao (usuario) VALUES (?)',
          [usuario],
          () => {
            navigation.navigate('PaginaProtegida');
          }
        );
      });
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <View>
      <Text>Usuário:</Text>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Digite o usuário"
      />
      <Text>Senha:</Text>
      <TextInput
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite a senha"
        secureTextEntry
      />
      <Button title="Login" onPress={fazerLogin} />
    </View>
  );
};

const PaginaProtegida = () => {
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    // Consulta os dados da sessão na tabela 'sessao'
    db.transaction(tx => {
      tx.executeSql(
        'SELECT usuario FROM sessao',
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            setUsuario(_array[0].usuario);
          } else {
            // Caso não haja uma sessão válida, redireciona para a página de login
            navigation.navigate('PaginaLogin');
          }
        }
      );
    });
  }, []);

  const logout = () => {
    // Remove os dados da sessão ao fazer logout
    db.transaction(tx => {
      tx.executeSql('DELETE FROM sessao');
    });
    // Redireciona para a página de login
    navigation.navigate('PaginaLogin');
  };

  return (
    <View>
      <Text>Bem-vindo, {usuario}!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

// Configuração da navegação
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PaginaLogin" component={PaginaLogin} />
        <Stack.Screen name="PaginaProtegida" component={PaginaProtegida} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;