import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { CameraView, Camera } from "expo-camera";
import sqLiteSession from '../conect/sqLiteSession'; // Importe a função para obter o ID do usuário
import sqlLiteDadosFicticios from "../conect/sqlLiteDadosFicticios"; // Importe o objeto padrão
import sqLiteUser from "../conect/sqLiteUser"; // Importe a função para obter o usuário pelo ID
import { useFocusEffect } from "@react-navigation/native"; // Importe useFocusEffect
import { Ionicons } from "@expo/vector-icons";
const { insertFictitiousData } = sqlLiteDadosFicticios;
import * as Animatable from "react-native-animatable";

export default function TesteScanner({ navigation }) {

  const negado = () =>{
    setScanned(false);
    setScannedData(null);
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [userId, setUserId] = useState(null); // Estado para armazenar o ID do usuário
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  const loadSpecificUser = useCallback(() => {

    

    sqLiteSession.getSession()
      .then(session => {
        if (session) {
          setUserId(session.userId); // Define o userId assim que a sessão for carregada
          sqLiteUser.getUsuarioById(session.userId)
            .then(usuario => {
              setUsuario(usuario);
              setIsLoading(false);
            })
            .catch(error => {
              console.log('Erro ao carregar usuário:', error.message);
            });
        } else {
          console.log('Nenhum perfil (logado)');
          setIsLoading(true);
          setTimeout(() => {
            console.log('Carregamento Concluído');
            navigation.navigate('Perfil');
            setIsLoading(false);
          }, 2000);
        }
      })
      .catch(error => {
        console.log('Erro ao carregar sessão:', error.message);
      });
  }, [navigation]);
  

  useFocusEffect(
    useCallback(() => {
      loadSpecificUser();
    }, [loadSpecificUser])
  );

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);
  
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const fictitiousData = generateFictitiousData(userId); // Passando userId para generateFictitiousData
  
    // Adicionando userId como uma propriedade do objeto fictitiousData
    fictitiousData.userId = userId;
  
    setScannedData(fictitiousData);
  };

  
  const saveScannedData = () => {
    if (scannedData) {
      insertFictitiousData(scannedData)
        .then(() => {
          console.log('Dados salvos com sucesso:', scannedData);
          navigation.navigate('Exibir');
        })
        .catch((error) => {
          console.error('Erro ao salvar dados:', error);
          alert('Erro ao salvar dados. Por favor, tente novamente.');
        });
    }
  };
  

  

  const generateFictitiousData = (userId) => {


    const formatarValor = (valor) => {
      // Remove caracteres não numéricos
      const numeroLimpo = valor.replace(/\D/g, '');
    
      // Formata o número para o formato de moeda sem o símbolo (por exemplo, 1.000,00)
      const numeroFormatado = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numeroLimpo / 100); // Divide por 100 para lidar com centavos
    
      return numeroFormatado;
    };






    const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const randomCpf = () => {
    const num = Array.from({ length: 10 }, () => randomInRange(0, 9)); // Agora estamos gerando 10 dígitos
    const digits = num.map((n, i) => n * (10 - (i % 10))).reduce((a, b) => a + b) % 11;
    return `${num.join('').substr(0, 10)}${digits < 10 ? digits : 0}`; // Estamos pegando os 10 primeiros dígitos
    };

  const cpf12Digitos = randomCpf();
  
    const randomCnpj = () => {
    const num = Array.from({ length: 12 }, () => randomInRange(0, 9));
    const digits = num.map((n, i) => n * (6 - (i % 8))).reduce((a, b) => a + b) % 11;
    const firstDigit = digits < 2 ? 0 : 11 - digits;
  
    const newDigits = num.concat(firstDigit);
    const secondDigits = newDigits.map((n, i) => n * (7 - (i % 8))).reduce((a, b) => a + b) % 11;
    const secondDigit = secondDigits < 2 ? 0 : 11 - secondDigits;
  
    return `${newDigits.join('')}${secondDigit}`;
  };
  
    const randomName = (prefix) => {
      let suffixes = [];
  
      switch (prefix) {
        case "Banco":
          suffixes = ["Santander", "Itaú", "Bradesco", "Caixa", "Banco do Brasil"];
          break;
        case "Supermercado":
          suffixes = ["Pão de Açúcar", "Extra", "Carrefour", "Walmart", "Assaí"];
          break;
        case "Farmácia":
          suffixes = ["Drogasil", "Drogaria São Paulo", "Pague Menos", "Droga Raia"];
          break;
        case "Hotel":
          suffixes = ["Grand Hyatt", "Sheraton", "Marriott", "Hilton", "Novotel"];
          break;
        case "Restaurante":
          suffixes = ["Outback", "Applebee's", "Olive Garden", "TGI Fridays", "Fogo de Chão"];
          break;
        case "Loja":
          suffixes = ["Nike", "Adidas", "Zara", "H&M", "Forever 21"];
          break;
        case "Padaria":
          suffixes = ["Panificadora Central", "Padaria do João", "Panetteria", "Pão & Cia"];
          break;
        case "Café":
          suffixes = ["Starbucks", "Coffee Lab", "Café do Ponto", "Café Cultura"];
          break;
        case "Posto de Gasolina":
          suffixes = ["Shell", "Petrobras", "Ipiranga", "BR", "Texaco"];
          break;
        default:
          suffixes = [];
      }
  
      const suffix = suffixes[randomInRange(0, suffixes.length - 1)];
      return `${prefix} ${suffix}`;
    };
  
    const generateBankTransfer = () => {
        const payerPrefix = "Banco"; // Prefixo para o pagador
        const recipientPrefixes = ["Supermercado", "Farmácia", "Hotel", "Restaurante", "Loja", "Padaria", "Café", "Posto de Gasolina"];
        const recipientPrefix = recipientPrefixes[randomInRange(0, recipientPrefixes.length - 1)]; // Prefixo para o beneficiário
      
        return {
          payerName: randomName(payerPrefix),
          payerDocument: cpf12Digitos, // CPF aleatório
          recipientName: randomName(recipientPrefix),
          recipientDocument: randomCnpj(), // CNPJ aleatório
          amount: formatarValor((Math.random() * 400).toFixed(2)), // Valor aleatório entre 0 e 1000
        };
      };
  
    // Escolha aleatória de qual tipo de dados fictícios gerar
    const randomDataSelector = Math.floor(Math.random() * 1);
    switch (randomDataSelector) {
      case 0:
        return generateBankTransfer();
      default:
        return null;
    }
  };
  

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>lilacPay</Text>
      <View style={styles.cameraContainer}>

        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={styles.camera}
        />
      </View>
      <Ionicons
        name='qr-code'
        size={50}
        color="#7318AB"
      />
      
      {scannedData && (
        <View style={styles.scannedDataContainer}>
          <Animatable.Text style={styles.scannedDataText}
          animation="fadeInLeft"
          duration={1000}
          delay={100}
          >
            {`CPF: ${scannedData.payerDocument}`}
          </Animatable.Text>
          <Animatable.Text style={styles.scannedDataText}
          animation="fadeInLeft"
          duration={1000}
          delay={300}
          >
            {`Beneficiário: ${scannedData.recipientName}`}
          </Animatable.Text>
          <Animatable.Text style={styles.scannedDataText}
          animation="fadeInLeft"
          duration={1000}
          delay={500}
          >
            {`CNPJ: ${scannedData.recipientDocument}`}
            </Animatable.Text>
          <Animatable.Text style={styles.scannedDataText}
          animation="fadeInLeft"
          duration={1000}
          delay={700}
          >
            {`Valor: ${scannedData.amount}`}
          </Animatable.Text>
        </View>
      )}

      {/* Verificação de sessao */}
      {/* {usuario && (
          <View style={styles.scannedDataContainer}>
  
              <Text style={styles.usuarioText}>Usuário:</Text>
              <Text style={styles.scannedDataText}>{usuario.nome}</Text>
              <Text style={styles.scannedDataText}>{usuario.email}</Text>

          </View>
      )} */}

    {scanned && (
      <>
        
        <Animatable.View style={styles.animadoV}
          animation="zoomIn"
          duration={1000}
          delay={200}
        >
          <Pressable 
            title={"Tap to Scan Again"} 
            onPress={() => {
              saveScannedData();
            }}
            style={styles.avancar}
          >
            <Ionicons
              name='chevron-forward'
              size={40}
              color="#fff"
            />
          </Pressable>
        </Animatable.View>

        <Animatable.View style={styles.animadoC}
          animation="zoomIn"
          duration={1000}
          delay={400}
        >
          <Pressable 
            title={"Tap to Scan Again"} 
            onPress={() => {
              negado();
            }}
            style={styles.negado}
          >
            <Ionicons
              name='close'
              size={40}
              color="#fff"
            />
          </Pressable>
        </Animatable.View>
        
      </>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor:  '#fff',
    gap: 100,
  },
  logo:{
    fontSize: 50,
    color: '#7318AB',
    fontFamily: 'InriaSans_400Regular',
  },
  cameraContainer: {
    borderWidth: 1,
    borderColor: '#7318AB',
    width: 300,
    height: 305,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.10)', // Transparência do container da câmera
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  scannedDataContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  scannedDataHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scannedDataText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#7318AB',
    fontFamily: 'InriaSans_400Regular',
  },
  avancar:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#7318AB',
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  animadoV:{
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  negado:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#646464',
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  animadoC:{
    position: 'absolute',
    bottom: 120,
    right: 20,
  },
});