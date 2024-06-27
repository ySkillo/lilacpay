import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform, Button, Alert} from 'react-native';
import styles from '../assets/css/acesso/acess';
import celular from '../assets/img/imgBlack/acessoImg.png';
import fechar from '../assets/img/close.png';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, Camera, useCameraPermissions } from 'expo-camera';
import { ActivityIndicator } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Animatable from 'react-native-animatable';

import sqLiteUser from '../conect/sqLiteUser';

function AcessoScreen({ navigation }) {

const [modalVisible, setModalVisible] = useState(false);

  const [modalVisibleCam, setModalVisibleCam] = useState(false);
  const [usuario, setUsuario] = useState ([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);



  const checarCampos = () =>{
    // Salvar os dados do usuário e a imagem codificada no SQLite
    if (!nome || !email || !telefone || !cpf || !dataNascimento || !senha) {
      console.log("Preencha todos os campos!");
      return;
    }else{
      setModalVisibleCam(true)
    }
  };

  const salvar = () => {
    // Salvar os dados do usuário e a imagem codificada no SQLite
    if (!nome || !email || !telefone || !cpf || !dataNascimento || !senha) {
      console.log("Preencha todos os campos!");
      
      return;
    }else{
      setModalVisible(false)
    }
    sqLiteUser.create({
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
      dataNascimento: dataNascimento,
      senha: senha,
      usuario: usuario 
    });
    // Limpar os campos após salvar
    setNome("");
    setEmail("");
    setTelefone("");
    setCpf("");
    setDataNascimento("");
    setSenha("");
    console.log("dados salvos")


    setTimeout(() => {
      setModalVisibleCam(false)
      setModalVisible(false)
      console.log('Botão de login pressionado');
      setIsLoading(true);
      setTimeout(() => {
        console.log('Carregamento Concluído');
        navigation.navigate('Login');
        setIsLoading(false);
      }, 3000);
    }, 3000);
  };
  

  const userAll = async (id) => {
    const users = await sqLiteUser.all();
    if (users !== false){
      setUsuario(users);
    } else{
      return false;
    }
  }

  useEffect(() => {
    userAll();
  }, [usuario]); 

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginPress = () => {
    setModalVisibleCam(false)
    setModalVisible(false)
    console.log('Botão de login pressionado');
    setIsLoading(true);
    setTimeout(() => {
      console.log('Carregamento Concluído');
      navigation.navigate('Login');
      setIsLoading(false);
    }, 2000);
  };

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [image64, setImage64] = useState(null);
  const cameraRef = useRef(null);

  const autorizar = async () => {
    try {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    } catch (error) {
      console.log(error);
    }
  };

  const takePicture = async () => {
    console.log('foto tirada');
    try {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);

        // Verifica se a imagem foi capturada corretamente
        if (data && data.uri) {
          setImage64(data.base64);
          console.log(data.base64);
          setImage(data.uri); // Atualiza o estado da imagem
        } else {
          console.log('Erro ao capturar a imagem');
        }
      } else {
        console.log('Ref da câmera não encontrada');
      }
    } catch (error) {
      console.log('Erro ao tirar a foto:', error);
    }
  };


  const [facing, setFacing] = useState('front');

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }







  //formatações:

  //CPF
  const formatCpf = (text) => {
    // Remove qualquer caracter que não seja número
    let cleaned = text.replace(/\D/g, '');
    // Aplica a máscara
    cleaned = cleaned.replace(/(\d{3})(\d)/, '$1.$2');
    cleaned = cleaned.replace(/(\d{3})(\d)/, '$1.$2');
    cleaned = cleaned.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cleaned;
  };

  //DATA DE NASCIMENTO
  const formatDataNascimento = (text) => {
    // Remove qualquer caracter que não seja número
    let cleaned = text.replace(/\D/g, '');
    // Aplica a máscara
    cleaned = cleaned.replace(/(\d{2})(\d)/, '$1/$2');
    cleaned = cleaned.replace(/(\d{2})(\d)/, '$1/$2');
    cleaned = cleaned.replace(/(\d{4})\d+?$/, '$1');
    return cleaned;
  };


  //TELEFONE
  const formatTelefone = (text) => {
    // Remove qualquer caracter que não seja número
    let cleaned = text.replace(/\D/g, '');
    // Aplica a máscara
    cleaned = cleaned.replace(/^(\d{2})(\d)/g, '($1) $2');
    cleaned = cleaned.replace(/(\d{5})(\d)/, '$1-$2');
    return cleaned;
  };







  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-300}
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
          visible={modalVisibleCam}
          onRequestClose={() => {

            setModalVisible(!modalVisibleCam);
          }}
        >
          <View style={styles.centeredView}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisibleCam(false)}
              >
                <Image source={fechar} style={styles.btnClose} />
              </Pressable>

              <View style={styles.modalView}>
                <View style={styles.tituloCad}>
                  <Animatable.Text
                    style={styles.tituloTwo}
                    animation="fadeIn"
                    duration={1000}
                    delay={400}
                  >
                    Imagem de verificação
                  </Animatable.Text>
                </View>

                <View style={styles.boxFoto}>
                  <View style={styles.foto}>
                    <CameraView style={styles.imagemVerificada} facing={facing} ref={cameraRef}>
                    </CameraView>

                  </View>
                </View>
                <View style={styles.textoFoto}>
                  <Animatable.Text style={styles.descricao}
                    animation="fadeInLeft"
                    duration={1000}
                    delay={200}>Tire a imagem em um fundo branco ou claro;</Animatable.Text>
                  <Animatable.Text style={styles.descricao}
                    animation="fadeInLeft"
                    duration={1000}
                    delay={400}>Não utilize acessórios que omitam sua face, como bonés, chapéus, máscaras, etc;</Animatable.Text>
                  <Animatable.Text style={styles.descricao}
                    animation="fadeInLeft"
                    duration={1000}
                    delay={600}>Não serão aceitas fotos borradas, escuras ou tiradas de forma inadequada.</Animatable.Text>

                </View>
                <Animatable.View style={styles.boxBtn}
                  animation="zoomIn"
                  duration={1500}
                  delay={400}>
                  <Pressable style={styles.btn} onPress={() => [salvar(), takePicture()]}>
                    <Ionicons name='camera' size={24} color="#fff" />
                  </Pressable>
                </Animatable.View>

                {/* verificando salvamento da foto */}
                {/* <Image source={!image ? require("../assets/img/mulher.jpg") : { uri: image }} style={styles.imagemTirada} /> */}

                {/* botao de autorização de foto */}
                {/* <Animatable.View style={styles.boxBtn}
                animation="zoomIn"
                duration={1500}
                delay={400}>
                    <Pressable style={styles.btn} onPress={() => autorizar()}>
                      <Text style={styles.textBtn}>Autorizar</Text>
                    </Pressable>
                </Animatable.View> */}
              </View>
            </ScrollView>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(false)}
              >
                <Image source={fechar} style={styles.btnClose} />
              </Pressable>

              <View style={styles.modalView}>
                <View style={styles.tituloCad}>
                  <Animatable.Text
                    style={styles.tituloTwo}
                    animation="fadeIn"
                    duration={1000}
                    delay={400}
                  >
                    Abra agora sua conta digital!
                  </Animatable.Text>
                </View>
                <View style={styles.inputs}>
                  <Animatable.View style={styles.label}
                    animation="fadeInDown"
                    duration={1000}
                    delay={200}
                  >
                    <Text style={styles.textlabel}>nome</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={setNome}
                      value={nome}
                      placeholder="Digite seu nome..."
                    />
                  </Animatable.View>
                  <Animatable.View style={styles.label}
                    animation="fadeInDown"
                    duration={1000}
                    delay={400}>
                    <Text style={styles.textlabel}>telefone</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => setTelefone(formatTelefone(text))}
                      value={telefone}
                      placeholder="(xx) xxxx-xxxx..."
                      keyboardType="phone-pad"
                      maxLength={15}
                    />
                  </Animatable.View>
                  <Animatable.View style={styles.label}
                    animation="fadeInDown"
                    duration={1000}
                    delay={600}>
                    <Text style={styles.textlabel}>e-mail</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={setEmail}
                      value={email}
                      placeholder="Digite seu e-mail..."
                    />
                  </Animatable.View>
                  <Animatable.View style={styles.label}
                    animation="fadeInDown"
                    duration={1000}
                    delay={800}>
                    <Text style={styles.textlabel}>CPF</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => setCpf(formatCpf(text))}
                      value={cpf}
                      placeholder="Digite seu CPF..."
                      keyboardType="numeric"
                      maxLength={14}
                    />
                  </Animatable.View>
                  <Animatable.View style={styles.label}
                    animation="fadeInDown"
                    duration={1000}
                    delay={1000}>
                    <Text style={styles.textlabel}>data de Nascimento</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => setDataNascimento(formatDataNascimento(text))}
                      value={dataNascimento}
                      placeholder="dd/mm/aaaa..."
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </Animatable.View>
                  <Animatable.View style={styles.label}
                    animation="fadeInDown"
                    duration={1500}
                    delay={1200}
                  >
                    <Text style={styles.textlabel}>Senha</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.inputSenha}
                        onChangeText={setSenha}
                        value={senha}
                        placeholder="Digite sua senha..."
                        secureTextEntry={!showPassword} // Se showPassword for true, a senha será exibida
                      />
                      <Pressable style={styles.visualizar} onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#fff" />
                      </Pressable>
                    </View>
                  </Animatable.View>
                  <Animatable.View style={styles.autorizacao}
                    animation="fadeIn"
                    duration={1500}
                    delay={1000}
                  >
                    <Pressable
                      style={[styles.checkbox, isChecked && styles.checked]}
                      onPress={handleCheckboxChange}
                    >
                      {isChecked && <Text style={styles.checkmark}>✓</Text>}
                    </Pressable>

                    <Text style={styles.textCheck}>Autorizo a lilacPay a tratar meus dados pessoais para envio de comunicações
                      sobre seus produtos e serviços e também estou de acordo com a Política de Privacidade.
                    </Text>
                  </Animatable.View>
                  <Animatable.View
                    animation="zoomIn"
                    duration={1500}
                    delay={900}
                    style={styles.btnCadastro}>
                    <Pressable style={styles.btn} onPress={() => checarCampos()}>
                      <Text style={styles.textBtn}>Continuar</Text>
                    </Pressable>
                  </Animatable.View>
                  <Animatable.View style={styles.span}
                    animation="fadeIn"
                    duration={1500}
                    delay={1300}>
                    <Text style={styles.loginOne}>Já tem conta na lilac?</Text><Pressable onPress={handleLoginPress}><Text style={styles.loginTwo}>Faça login.</Text></Pressable>
                  </Animatable.View>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>

        <View style={styles.conteudo1}>
          <Animatable.Text
            style={styles.logo}
            animation="fadeInLeft"
            duration={1000}
            delay={400}>lilacPay</Animatable.Text>
        </View>

        <View style={styles.conteudo2}>
          <Animatable.Text style={styles.titulo}
            animation="fadeIn"
            duration={1000}
            delay={200}>
            Conta Digital
          </Animatable.Text>
          <Animatable.Text style={styles.descricao}
            animation="fadeIn"
            duration={1000}
            delay={500}>
            Simplifique toda a sua vida com uma conta digital
            completa e um App com shopping, investimento, recarga e muito mais!
          </Animatable.Text>
        </View>

        <Animatable.View style={styles.conteudo3}
          animation="fadeInUp"
          duration={1500}
          delay={200}>
          <Pressable style={styles.btn} onPress={() => setModalVisible(true)}>
            <Text style={styles.textBtn}>Abra sua conta</Text>
          </Pressable>
        </Animatable.View>

        <View style={styles.conteudo4}>
          <Animatable.View
            animation="fadeInRight"
            duration={1500}
            delay={500}>
            <Image source={celular} style={styles.img} />
          </Animatable.View>

          {/* Verificar se o insert De usuario funcionou */}
          <View>
            <Text style={styles.textBtn}>{JSON.stringify(usuario)}</Text>
            <TextInput onChangeText={setUsuario} value={JSON.usuario} style={styles.textBtn}/>
          </View>
        </View>
        
      </View>
    </KeyboardAvoidingView>
  );
}

export default AcessoScreen;
