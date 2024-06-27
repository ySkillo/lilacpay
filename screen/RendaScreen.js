import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable, Image, TextInput } from 'react-native';
import styles from '../assets/css/renda/renda';
import voltar from '../assets/img/voltar.png';
import { useFocusEffect } from '@react-navigation/native';
import sqLiteRenda from '../conect/sqLiteRenda';
import sqLiteSession from '../conect/sqLiteSession';
import sqLiteUser from '../conect/sqLiteUser';

function RendaScreen({ navigation }) {
    const [renda, setRenda] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [infoRenda, setInfoRenda] = useState('');

    useFocusEffect(
      useCallback(() => {
          const loadSpecificUser = () => {
              sqLiteSession.getSession()
                  .then(session => {
                      if (session) {
                          sqLiteUser.getUsuarioById(session.userId)
                              .then(usuario => {
                                  setUsuario(usuario);
                                  // Definir infoRenda com a renda do usuário, se existir
                                  setInfoRenda(usuario.renda || '');
                                  // Verificar se o usuário já possui uma renda
                                  if (usuario.renda) {
                                      // Se o usuário tiver uma renda, navegue diretamente para a tela de exemplo
                                      navigation.navigate('Home');
                                  }
                              })
                              .catch(error => {
                                  console.log('Erro ao carregar usuário:', error.message);
                              });
                      } else {
                          navigation.navigate('Login');
                      }
                  })
                  .catch(error => {
                      console.log('Erro ao carregar sessão:', error.message);
                  });
          };

          loadSpecificUser();
      }, [navigation])
  );
      
    
    
    



  const formatarRenda = (valor) => {
    // Remove caracteres não numéricos
    const numeroLimpo = valor.replace(/\D/g, '');

    // Formata o número para o formato de moeda sem o símbolo (por exemplo, 1.000,00)
    const numeroFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numeroLimpo / 100); // Divide por 100 para lidar com centavos

    return numeroFormatado;
};

const formatarBanco = (valor) => {
    // Remove caracteres não numéricos
    const numeroLimpo = valor.replace(/\D/g, '');

    // Formata o número apenas com duas casas decimais
    const numeroFormatado = (numeroLimpo / 100).toFixed(2); // Divide por 100 para lidar com centavos e formata para duas casas decimais

    return numeroFormatado;
};

const inserirRenda = () => {
    if (!usuario) {
        console.error('Usuário não encontrado.');
        return;
    }

    // Remover formatação de milhares e manter apenas os centavos
    const rendaParaBanco = formatarBanco(renda);

    const userId = usuario.id; // Usar o userId do usuário logado

    // Inserir a renda no banco de dados
    const insertRendaNoBanco = async () => {
        try {
            const insertId = await sqLiteRenda.insertRenda(userId, rendaParaBanco);
            console.log('Renda inserida com sucesso. ID:', insertId);
            console.log('Renda:', rendaParaBanco);

            // Atualizar as informações da renda na tela, se necessário
            setInfoRenda(renda);

            // Navegar para a próxima tela
            navigation.navigate('Senha');
        } catch (error) {
            console.error('Erro ao inserir renda:', error.message);
        }
    };

    // Chamar a função para inserir a renda no banco de dados
    insertRendaNoBanco();
};

    
    
    
    
    
    
    
    
      
      

    const voltando = () => {
        navigation.navigate('Login');
    };
    
  return (
    <View style={styles.container}>
      <View style={styles.conteudo1}>
        <Pressable style={styles.btnVoltar} onPress={() =>  voltando()}>
            <Image source={voltar} style={styles.icoVoltar}/>
        </Pressable>
        <Text style={styles.text1}>Informe sua</Text><Text style={styles.text2}>renda mensal!</Text>
      </View>
      <View style={styles.conteudo2}>
        <View style={styles.inputs}>
            <Text style={styles.label}>Renda</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setRenda(formatarRenda(text))}
              value={renda}
              placeholder='Digite sua renda...'
              keyboardType="numeric"
              maxLength={16} // Limitar o comprimento do texto para evitar entradas excessivamente longas
            />



        </View>

        <Pressable style={styles.btn} onPress={inserirRenda}>
            <Text style={styles.textBtn}>Acessar conta</Text>
        </Pressable>
        

        {/* EXIBIR RENDA */}

        {/* <Text style={styles.box}>
          {usuario ? (usuario.renda ? `Renda: ${infoRenda}` : 'Renda não disponível') : 'Carregando...'}
        </Text> */}
       
      </View>
    </View>
  );
}

export default RendaScreen;
