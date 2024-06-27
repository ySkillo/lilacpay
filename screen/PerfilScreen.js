import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  Alert
} from "react-native"
import { useFocusEffect } from '@react-navigation/native';

import styles from "../assets/css/perfil/perfil";
import icoPerfil from "../assets/img/perfil.png";
import icoBandeira from "../assets/img/icon/bandeira.png";
import icoChave from "../assets/img/icon/chave.png";
import icoPix from "../assets/img/icon/pix.png";
import fechar from "../assets/img/close.png";
import { Ionicons } from "@expo/vector-icons";
import sqLiteUser from "../conect/sqLiteUser";
import sqLiteSession from "../conect/sqLiteSession";
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from 'react-native';



function PerfilScreen({ navigation }) {
  const [usuario, setUsuario] = useState([]);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');

  
  useEffect(() => {
    // Função de limpeza que redefine os estados do perfil para os valores iniciais vazios
    return () => {
      setUsuario([]);
      setNome('');
      setSobrenome('');
      setCpf('');
    };
  }, []);

  const selecionarUser = (nome, sobrenome, cpf) => {
    setNome(nome);
    setSobrenome(sobrenome);
    setCpf(cpf);
    setModalVisible(false);
  };

  const userAll = async (id) => {
    const users = await sqLiteUser.all();
    if (users !== false) {
      setUsuario(users);
    } else {
      return false;
    }
  };

  useEffect(() => {
    userAll();
  }, []);

  useEffect(() => {
  if (usuario.length > 0) {
    const randomIndex = Math.floor(Math.random() * usuario.length);
    const randomUser = usuario[randomIndex];

    const partesNome = randomUser.nome.split(" ");
    const primeiraLetraNome = partesNome[0].charAt(0);
    const ultimoNome = partesNome[partesNome.length - 1];
    const primeiraLetraSobrenome = ultimoNome.charAt(0);

    setNome(randomUser.nome);
    setCpf(randomUser.cpf);
    setSobrenome(`${primeiraLetraNome}${primeiraLetraSobrenome}`);
  }
}, [usuario]); // Executa quando a lista de usuários é alterada





  const logar = () => {
    sqLiteUser.checkCredentials(cpf, senha)
      .then(usuario => {
        console.log('Usuário autenticado:', usuario);

        // Simulação de geração de token e tempo de login
        const token = 'TOKEN_GERADO';
        const loginTime = Date.now();

        // Iniciando a sessão
        sqLiteSession.startSession(usuario.id, token, loginTime)
          .then(() => {

            console.log('Botão de login pressionado');
            setIsLoading(true);
            setTimeout(() => {
              console.log('Carregamento Concluído');
              navigation.navigate('Home');
              setIsLoading(false);
            }, 2000);
          
          })
          .catch(error => {
            console.log('Erro ao iniciar sessão:', error.message);
            Alert.alert('Erro', 'Erro ao iniciar sessão');

          });
      })
      .catch(error => {
        console.log('Erro ao autenticar usuário:', error.message);
        Alert.alert('Erro', 'Credenciais inválidas');
      });
  };









  const [isLoading, setIsLoading] = useState(false);

  const cadastrar = () => {
    setModalVisible(false)
    console.log('Botão de cadastro pressionado');
    setIsLoading(true);
    setTimeout(() => {
      console.log('Carregamento Concluído');
      navigation.navigate('Acesso');
      setIsLoading(false);
    }, 2000);
  };
















  const [modalVisible, setModalVisible] = useState(false);
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-300} // ajuste este valor conforme necessário
    >
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#7318AB" />
          </View>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}
            >
              <Image source={fechar} style={styles.btnClose} />
            </Pressable>

            <View style={styles.modalView}>
              <View style={styles.perfisUser}>
                <Text style={styles.titulo}>Selecione o perfil</Text>
              </View>
              <View style={styles.areaUsers}>
                <Pressable
                  style={styles.usuariosCadastro}
                  onPress={() => cadastrar()}
                >
                  <View style={styles.perfilCadastro}>
                    <Text style={styles.abreviacaoUser}>
                    <Ionicons
                      name='person-add'
                      size={24}
                      color="#7318AB"
                    />
                    </Text>
                  </View>
                  <Text style={styles.nomeCadastro}> Cadastrar outra conta</Text>
                </Pressable>

                <FlatList
                  data={usuario}
                  renderItem={({ item }) => {
                    // Separa o nome completo em palavras
                    const partesNome = item.nome.split(" ");
                    // Pega a primeira letra do primeiro nome
                    const primeiraLetraNome = partesNome[0].charAt(0);
                    // Pega a primeira letra do último nome
                    const ultimoNome = partesNome[partesNome.length - 1];
                    const primeiraLetraSobrenome = ultimoNome.charAt(0);

                    return (
                      <Pressable
                        style={styles.usuarios}
                        onPress={() =>
                          selecionarUser(item.nome, `${primeiraLetraNome}${primeiraLetraSobrenome}`, item.cpf)
                        }
                      >
                        <View style={styles.perfilUsuario}>
                          <Text style={styles.abreviacaoUser}>{`${primeiraLetraNome}${primeiraLetraSobrenome}`}</Text>
                        </View>
                        <Text style={styles.nomeUsuario}>{item.nome}</Text>
                      </Pressable>
                    );
                  }}
                  keyExtractor={(item) => item.id.toString()}
                />

              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.conteudo1}>
          <Text style={styles.header}>lilacPay</Text>
          <Pressable
            style={styles.perfis}
            onPress={() => setModalVisible(true)}
          >
            <Image source={icoPerfil} style={styles.iconPerfil} />
          </Pressable>
        </View>
        <View style={styles.conteudo2}>
          <Animatable.View
            style={styles.perfil}
            animation="fadeIn"
            duration={1000}
            delay={400}
          >
            <Text style={styles.abreviacao}>{sobrenome}</Text>
          </Animatable.View>
          <Animatable.Text
            style={styles.nomePerfil}
            animation="fadeIn"
            duration={1000}
            delay={400}
          >
            {nome}
          </Animatable.Text>
        </View>
        <View style={styles.conteudo3}>
          <View style={styles.inputs}>
            <Animatable.View
              style={styles.label}
              animation="fadeInDown"
              duration={1000}
              delay={100}
            >
              <Text style={styles.textlabel}>senha</Text>
              <TextInput
                style={styles.input}
                onChangeText={setSenha}
                value={senha}
                placeholder="Digite sua senha..."
                secureTextEntry={!showPassword}
              />
              <Pressable style={styles.recuperar}>
                <Text style={styles.textlabel}>Esqueceu sua senha?</Text>
              </Pressable>
              <Pressable
                style={styles.visualizar}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#fff"
                />
              </Pressable>
            </Animatable.View>
          </View>
        </View>
        <View style={styles.conteudo4}>
          <Animatable.View
            animation="zoomIn"
            duration={1500}
            delay={100}
            style={styles.btnEntrar}
          >
            <Pressable style={styles.btn} onPress={() => logar()}>
              <Text style={styles.textBtn}>Entrar</Text>
            </Pressable>
          </Animatable.View>
        </View>
        <View style={styles.conteudo5}>
          <Animatable.View
            style={styles.card}
            animation="fadeInLeft"
            duration={1000}
            delay={200}
          >
            <Image source={icoBandeira} />
            <Text style={styles.textCard}>ATALHOS</Text>
          </Animatable.View>
          <Animatable.View
            style={styles.card}
            animation="fadeInLeft"
            duration={1000}
            delay={400}
          >
            <Image source={icoChave} />
            <Text style={styles.textCard}>TOKEN</Text>
          </Animatable.View>
          <Animatable.View
            style={styles.card}
            animation="fadeInLeft"
            duration={1000}
            delay={600}
          >
            <Image source={icoPix} />
            <Text style={styles.textCard}>PIX</Text>
          </Animatable.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default PerfilScreen;
