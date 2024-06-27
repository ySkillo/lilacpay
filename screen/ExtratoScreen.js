import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, Pressable, Alert, Share, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import sqLiteSession from '../conect/sqLiteSession';
import sqLiteUser from '../conect/sqLiteUser';
import sqlLiteDadosFicticios from "../conect/sqlLiteDadosFicticios";
const { deleteFatura, loadDeletedInvoices } = sqlLiteDadosFicticios;
import styles from '../assets/css/extrato/extrato';
import { Ionicons } from "@expo/vector-icons";
import logo from '../assets/img/logo2.png';
import * as Animatable from 'react-native-animatable';







function ExtratoScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [fictitiousData, setFictitiousData] = useState(null);
  const [deletedInvoices, setDeletedInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const viewShotRef = useRef(null);

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

  const loadDeletedFaturas = (userId) => {
    loadDeletedInvoices(userId)
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

  const formatarRenda = (valor) => {
    const numeroLimpo = valor.replace(/\D/g, '');
    const numeroFormatado = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numeroLimpo / 100);

    return numeroFormatado;
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const groupInvoicesByDate = (invoices) => {
    return invoices.reduce((groups, invoice) => {
      const date = formatarData(invoice.deletedAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(invoice);
      return groups;
    }, {});
  };

  const groupedInvoices = groupInvoicesByDate(deletedInvoices);

  const renderItem = ({ item }) => (
    <View style={styles.boxFaturas}>
      <Pressable onPress={() => handleItemPress(item)} style={styles.itemContainer}>
        <Text style={styles.text}>{`Recipiente: ${item.recipientName}`}</Text>
        <Text style={styles.rendaText}>{`- R$${item.amount}`}</Text>
      </Pressable>
    </View>
  );

  const renderGroupedInvoices = () => {
    return Object.keys(groupedInvoices).map((date) => (
      <View key={date} style={styles.containerFlat}>
        <Text style={styles.dateHeader}>{date}</Text>
        <FlatList
          data={groupedInvoices[date]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.deletedContainer}
        />
      </View>
    ));
  };

  const handleItemPress = (item) => {
    setSelectedInvoice(item);
    setIsModalVisible(true);
  };

  const shareTextOnWhatsApp = async () => {
    try {
      const formattedText = `👤 *Nome do Usuário:* ${usuario.nome}\n` +
                            `📧 *Email:* ${usuario.email}\n` +
                            `📱 *Telefone:* ${usuario.telefone}\n` +
                            `👤 *CPF:* ${usuario.cpf}\n\n` +
                            `📝 *Sua Fatura Paga com LilacPay!:*\n\n` +
                            `🏦 *Instituição:* ${selectedInvoice.payerName}\n` +
                            `🔢 *CNPJ:* ${selectedInvoice.recipientDocument}\n` +
                            `💳 *Recipiente:* ${selectedInvoice.recipientName}\n` +
                            `💰 *Valor:* R$ ${selectedInvoice.amount}\n` +
                            `📅 *Data de Pagamento:* ${formatarData(selectedInvoice.deletedAt)}\n\n` +
                            `📣 *Informações adicionais*\n` +
                            `Esta é uma fatura Paga. Para mais detalhes, entre em contato com o suporte.`;
  
      await Share.share({
        message: formattedText,
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao compartilhar o texto.');
    }
  };




  const voltar = () => {
    navigation.navigate('Home');
  };


  return (
    <View style={styles.container}>
      <View style={styles.conteudo1}>
        <Pressable onPress={() => voltar()}>
          <Ionicons name='arrow-back'
            size={30}
            color="#510A7D"
          />
        </Pressable>
          <Text style={styles.header}>Extrato</Text>

        <Ionicons name='settings-outline'
          size={30}
          color="#510A7D"
        />
      </View>
      <View style={styles.conteudo2}>
        {renderGroupedInvoices()}
      </View>
      {selectedInvoice && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Animatable.Text
                animation="fadeInLeft"
                duration={1000}
                delay={100}  style={styles.textModal}>{`Instituição: ${selectedInvoice.payerName}`}</Animatable.Text>
                <Animatable.Text
                animation="fadeInLeft"
                duration={1000}
                delay={200} style={styles.textModal}>{`CNPJ: ${selectedInvoice.recipientDocument}`}</Animatable.Text>
                <Animatable.Text
                animation="fadeInLeft"
                duration={1000}
                delay={300} style={styles.textModal}>{`Recipiente: ${selectedInvoice.recipientName}`}</Animatable.Text>
                <Animatable.Text
                animation="fadeInLeft"
                duration={1000}
                delay={100} style={styles.textModal}>{`Valor: R$${selectedInvoice.amount}`}</Animatable.Text>
                <Animatable.Text
                animation="fadeInLeft"
                duration={1000}
                delay={200} style={styles.textModal}>{`CPF: ${selectedInvoice.payerDocument}`}</Animatable.Text>
                <Animatable.Text
                animation="fadeInLeft"
                duration={1000}
                delay={300} style={styles.textModal}>{`Data de Pagamento: ${formatarData(selectedInvoice.deletedAt)}`}</Animatable.Text>
                <Pressable
                  style={styles.shareButton}
                  onPress={shareTextOnWhatsApp}
                >
                 <Ionicons name='share-social-outline'
                    size={30}
                    color="#D6D6D6"
                  />
                </Pressable>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setIsModalVisible(false)}
                >
                   <Ionicons name='close'
                    size={30}
                    color="#D6D6D6"
                  />
                </Pressable>
                <View style={styles.alinhamento}>
                  <Animatable.Image
                  animation="zoomIn"
                  duration={1200}
                  delay={300} source={logo} style={styles.logoImg}/>
                </View>
                
              </View>
          
          </View>
        </Modal>
      )}
    </View>
  );
}

export default ExtratoScreen;
