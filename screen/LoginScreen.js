import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView, 
  Platform,
  Alert
} from "react-native";
import styles from "../assets/css/login/login";
import {ActivityIndicator } from 'react-native';
import * as Animatable from "react-native-animatable";
import { Ionicons } from '@expo/vector-icons';
import sqLiteUser from '../conect/sqLiteUser';
import sqLiteSession from '../conect/sqLiteSession';
import sqLiteRenda from '../conect/sqLiteRenda';


function LoginScreen({ navigation }) {

  
  


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

          setIsLoading(true);
          setTimeout(() => {
            navigation.navigate('Renda');
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
      Alert.alert('Erro', 'Preencha todos os campos!');
    });
  };
  
  

  







  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isLoading, setIsLoading] = useState(false);

  const cadastrar = () =>{
   
    setIsLoading(true);
    setTimeout(() => {
      navigation.navigate('Acesso');
      setIsLoading(false);
    }, 2000);
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



  return (
    <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-300} // ajuste este valor conforme necessário
    >
      <View style={styles.container}>
          {isLoading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#7318AB"/>
            </View>
          )}
          <ScrollView contentContainerStyle={styles.scroll}>
        
            <View style={styles.conteudo1}>
              <Text style={styles.header}>Login</Text>

              <Pressable style={styles.buttonClose} onPress={() => cadastrar()}>
                <Ionicons name="arrow-back" size={30} color="#7318AB" />
              </Pressable>
            </View>
            <View style={styles.conteudo2}>
              <Animatable.Text style={styles.titulo}
              animation="fadeIn"
              duration={1500}
              delay={200}>Faça login na sua conta!</Animatable.Text>
            </View>
        
            <View style={styles.conteudo3}>
              <View style={styles.inputs}>
                <Animatable.View
                  style={styles.label}
                  animation="fadeInDown"
                  duration={1000}
                  delay={200}
                >
                  <Text style={styles.textlabel}>cpf</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setCpf(formatCpf(text))}
                    value={cpf}
                    placeholder="Digite seu CPF..."
                    keyboardType="numeric"
                    maxLength={14}
                  />
                </Animatable.View>
                <Animatable.View
                  style={styles.label}
                  animation="fadeInDown"
                  duration={1000}
                  delay={400}
                >
                  <Text style={styles.textlabel}>senha</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Digite sua senha..."
                    secureTextEntry={!showPassword} 
                  />
                  <Pressable style={styles.visualizar} onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#fff" />
                  </Pressable>
                  <Pressable style={styles.recuperar}>
                    <Text style={styles.textlabel}>Esqueceu sua senha?</Text>
                  </Pressable>
                  
                </Animatable.View>
              </View>
            </View>
            <View style={styles.conteudo4}>
              <Animatable.View
                style={styles.autorizacao}
                animation="fadeIn"
                duration={1500}
                delay={600}
              >
                <Pressable
                  style={[styles.checkbox, isChecked && styles.checked]}
                  onPress={handleCheckboxChange}
                >
                  {isChecked && <Text style={styles.checkmark}>✓</Text>}
                </Pressable>

                <Text style={styles.textCheck}>
                  Autorizo a lilacPay a tratar meus dados pessoais para envio de
                  comunicações sobre seus produtos e serviços e também estou de
                  acordo com a Política de Privacidade.
                </Text>
              </Animatable.View>
            </View>
            <View style={styles.conteudo5}>
              <Animatable.View
                animation="zoomIn"
                duration={1500}
                delay={800}
                style={styles.btnEntrar}>
                  <Pressable style={styles.btn} onPress={() => logar()}>
                    <Text style={styles.textBtn}>Entrar</Text>
                  </Pressable>
              </Animatable.View>
            </View>
          </ScrollView>
        
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
