import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from "../assets/css/pagamento/pagamento";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import sqLiteSession from '../conect/sqLiteSession';
import sqLiteUser from '../conect/sqLiteUser';
import sqLiteRenda from '../conect/sqLiteRenda';
import sqlLiteDadosFicticios from "../conect/sqlLiteDadosFicticios";
const { deleteFatura, loadDeletedInvoices } = sqlLiteDadosFicticios;

import image from '../assets/img/homemImg.png';













function PagamentoScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [fictitiousData, setFictitiousData] = useState(null);
  const [deletedInvoices, setDeletedInvoices] = useState([]);
  const [valor, setValor] = useState('');
  const [selectedFatura, setSelectedFatura] = useState(null);

  const loadSpecificUser = () => {
    sqLiteSession.getSession()
      .then(session => {
        if (session) {
          sqLiteUser.getUsuarioById(session.userId)
            .then(usuario => {
              setUsuario(usuario);
              loadFictitious(session.userId);
              loadDeletedFaturas(session.userId);
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

  const loadFictitious = (userId) => {
    sqlLiteDadosFicticios.loadFictitiousData(userId)
      .then(data => {
        setFictitiousData(data);
      })
      .catch(error => {
        console.log('Erro ao carregar dados fictícios:', error.message);
      });
  };

  const loadDeletedFaturas = (userId) => { // Recebe o ID do usuário como parâmetro
    loadDeletedInvoices(userId) // Passa o ID do usuário para a função
      .then(data => {
        setDeletedInvoices(data);
      })
      .catch(error => {
        console.log('Erro ao carregar faturas deletadas:', error.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      loadSpecificUser();
    }, [])
  );

  const logout = () => {
    sqLiteSession.endSession()
      .then(() => {
        navigation.navigate('Perfil');
      })
      .catch(error => {
        console.error('Erro ao encerrar sessão:', error.message);
      });
  };

  const formatRenda = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  const handleChange = (text) => {
    const valorFormatado = formatarRenda(text);
    setValor(valorFormatado);
  };

  const handlePagarPress = () => {
    if (selectedFatura) {
      if (selectedFatura) {
        // Verifica se o valor digitado é um número válido
        const valorFatura = parseFloat(valor.replace(',', '.')); // Substitui vírgula por ponto e converte para float

        if (isNaN(valorFatura) || !isFinite(valorFatura)) {
          console.log('Por favor, insira um valor válido para a fatura.');
          return;
        }

        console.log("verificando usuario:", usuario.renda)

        // Armazena o valor original de usuario.renda
        // Converte e usa usuario.renda para cálculos
        const saldoUsuario = usuario.renda; // Remove ponto e converte para float
        console.log('Saldo do usuário:', saldoUsuario);
        console.log('Valor da fatura:', valorFatura);

        // Restaura o valor original de usuario.renda




        if (saldoUsuario >= valorFatura) {
          const valorFaturaOriginal = parseFloat(selectedFatura.amount.replace('.', '').replace(',', '.'));
          if (valorFaturaOriginal === valorFatura) {
            // Calcula o novo saldo do usuário após pagar a fatura
            const novoSaldo = saldoUsuario - valorFatura;

            // Atualiza o valor do saldo do usuário na tabela Renda
            sqLiteRenda.updateRenda(usuario.id, novoSaldo)
              .then(() => {
                deleteFatura(selectedFatura.id, usuario.id, () => {
                  navigation.navigate('Home');
                  console.log('Pagamento efetuado!');
                  setValor('');
                  setSelectedFatura(null);
                  loadFictitious(usuario.id); // Recarrega as faturas após a exclusão
                  loadDeletedFaturas(usuario.id); // Recarrega as faturas deletadas após a exclusão, passando o userId
                });

              })
              .catch(error => {
                console.error('Erro ao atualizar o saldo do usuário:', error.message);
              });
          } else {
            console.log('O valor digitado não corresponde ao valor da fatura.');
          }
        } else {
          console.log('Saldo insuficiente para pagar a fatura.');
        }
      } else {
        console.log('Por favor, selecione uma fatura.');
      }
    }
  };







  const formatarRenda = (valor) => {
    // Remove caracteres não numéricos
    const numeroLimpo = valor.replace(/\D/g, '');

    // Formata o número para o formato de moeda sem o símbolo (por exemplo, 1.000,00)
    const numeroFormatado = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numeroLimpo / 100); // Divide por 100 para lidar com centavos

    return numeroFormatado;
  };



  const voltar = () =>{
    navigation.navigate('Home');
  };






  const  scannear = () => {
    navigation.navigate('Scanner');
  }


  return (
    <View style={styles.container}>
      <View style={styles.conteudo1}>
        <Pressable onPress={() => voltar()}>
          <Ionicons
            name='arrow-back'
            size={30}
            color='#380557'
          />
        </Pressable>
        <Text style={styles.headerText}>Pagamentos</Text>
        <Ionicons
          name='settings-outline'
          size={30}
          color='#380557'
        />
      </View>
      <View style={styles.conteudo2}>
        <Pressable style={styles.box} onPress={() => scannear()}>
          <View style={styles.alinhamento}>
            
              <Ionicons
                name='camera-outline'
                size={35}
                color='#fff'
              />
          
           

            <Text style={styles.textSelecao}>Escanear</Text>
          </View>
          <Ionicons
            name='chevron-forward'
            size={25}
            color='#fff'
          />
        </Pressable>

        <View style={styles.box}>
          <View style={styles.alinhamento}>

            <MaterialIcon
              name='keyboard'
              size={35}
              color='#fff'
            />

            <Text style={styles.textSelecao}>Digitar</Text>
          </View>
          <Ionicons
            name='chevron-forward'
            size={25}
            color='#fff'
          />
        </View>
      </View>
      <View style={styles.conteudo3}>
        <Text style={styles.titulo}>Mais ações</Text>
        <View style={styles.opcoes}>
          <View style={styles.cards}>
            <Ionicons
              name='card-outline'
              size={35}
              color='#7318AB'
            />
            <Text style={styles.textCard}>Cartão crédito</Text>
          </View>
          <View style={styles.cards}>
            <Ionicons
              name='home-outline'
              size={35}
              color='#7318AB'
            />
            <Text style={styles.textCard}>DARF</Text>
          </View>
          <View style={styles.cards}>
            <Ionicons
              name='cash-outline'
              size={35}
              color='#7318AB'
            />
            <Text style={styles.textCard}>Débito automático</Text>
          </View>
          <View style={styles.cards}>
            <Ionicons
              name='car-sport-outline'
              size={35}
              color='#7318AB'
            />
            <Text style={styles.textCard}>Veículo</Text>
          </View>
        </View>
      </View>
      <View style={styles.conteudo4}>
        <Text style={styles.titulo}>Boletos Digitais</Text>
        <View style={styles.boxSlogan}>
          <View style={styles.slogan}>
            <Text style={styles.tituloSlogan}>Central de Boletos</Text>
            <Text style={styles.textSlogan}>Encontre e pague todos os boletos emitidos em seu CPF</Text>

            <Pressable style={styles.btn}>
              <Text style={styles.textBtn}>Ativar agora</Text>
            </Pressable>
          </View>
          <View style={styles.imgBox}>

              <Image source={image} style={styles.imagem} />

          </View>
        </View>
      </View>

































      {/* Exibição de dados!!! TESTE */}

      {/* <Text style={styles.text}>Tela de Pagamento</Text>

       
      {usuario && (
        <View style={styles.usuarioContainer}>
          <Text style={styles.usuarioText}>Usuário:</Text>
          <Text>{usuario.nome}</Text>
          <Text>{usuario.email}</Text>
          <Text>{usuario.telefone}</Text>
          <Text>{usuario.cpf}</Text>
          <Text>{usuario.dataNascimento}</Text>
        </View>
      )}
      {selectedFatura && (
        <View>
          <Text>Detalhes da Fatura Selecionada:</Text>
          <Text>{`Instituição: ${selectedFatura.payerName}`}</Text>
          <Text>{`CNPJ: ${selectedFatura.recipientDocument}`}</Text>
          <Text>{`Recipiente: ${selectedFatura.recipientName}`}</Text>
          <Text>{`Valor: ${selectedFatura.amount}`}</Text>
          <Text>{`CPF: ${selectedFatura.payerDocument}`}</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o valor da fatura"
            keyboardType="numeric"
            value={valor}
            onChangeText={handleChange}
          />
          <Pressable title="Pagar" onPress={handlePagarPress} style={styles.btn}>
            <Text>Pagar</Text>
          </Pressable>
        </View>
      )}
      {usuario && (
        <View style={styles.rendaContainer}>
          <Text style={styles.rendaText}>Renda:</Text>
          <Text>{formatRenda(usuario.renda)}</Text>
        </View>
      )}
      <Pressable onPress={logout}>
        <Text>Sair</Text>
      </Pressable>
      {fictitiousData && (
        <View style={styles.fictitiousContainer}>
          <Text style={styles.rendaText}>Dados Fictícios:</Text>
          {fictitiousData.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedFatura(item)}
            >
              <Text>{`Instituição: ${item.payerName}`}</Text>
              <Text>{`CNPJ: ${item.recipientDocument}`}</Text>
              <Text>{`Recipiente: ${item.recipientName}`}</Text>
              <Text>{`Valor: ${item.amount}`}</Text>
              <Text>{`CPF: ${item.payerDocument}`}</Text>
              <Text style={styles.rendaText}>______________________________________________</Text>
            </Pressable>
          ))}
        </View>
      )}
      {deletedInvoices && (
        <View style={styles.deletedContainer}>
          <Text style={styles.rendaText}>Faturas Pagas:</Text>
          {deletedInvoices.map((item, index) => (
            <View key={index}>
              <Text>{`ID: ${item.faturaId}`}</Text>
              <Text>{`Instituição: ${item.payerName}`}</Text>
              <Text>{`CNPJ: ${item.recipientDocument}`}</Text>
              <Text>{`Recipiente: ${item.recipientName}`}</Text>
              <Text>{`Valor: ${item.amount}`}</Text>
              <Text>{`CPF: ${item.payerDocument}`}</Text>
              <Text style={styles.rendaText}>______________________________________________</Text>
            </View>
          ))}
        </View>
      )} */}
    </View>
  );
}



export default PagamentoScreen;