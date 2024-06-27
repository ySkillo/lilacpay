import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text,Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import sqLiteSession from '../conect/sqLiteSession';
import sqLiteUser from '../conect/sqLiteUser';
import { ActivityIndicator } from 'react-native';
import * as Animatable from "react-native-animatable";
import logoImg from '../assets/img/imgLogo.png';


function SplashSession({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadSpecificUser = () => {
    sqLiteSession.getSession()
      .then(session => {
        if (session) {
          sqLiteUser.getUsuarioById(session.userId)
            .then(usuario => {
              setUsuario(usuario);
              
              console.log('Verificando se existem contas cadastradas');
              setIsLoading(true);
              setTimeout(() => {
                console.log('Verificação Concluída -- LOGADO COM SUCESSO');
                navigation.navigate('Home');
                setIsLoading(false);
              }, 7000);
            })
            .catch(error => {
              console.log('Erro ao carregar usuário:', error.message);
            });
        } else {
          setIsLoading(true);
          setTimeout(() => {
            console.log('Verificação Concluída -- NENHUM USUARIO LOGADO!');
            navigation.navigate('Acesso');
            setIsLoading(false);
          }, 7000);
        }
      })
      .catch(error => {
        console.log('Erro ao carregar sessão:', error.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      loadSpecificUser();
    }, [])
  );





  return (
    <View style={styles.container}>
      {isLoading && (
          <View style={styles.loading}>
            <View style={styles.conteudo}>
              <Animatable.View style={styles.animada}
              animation="fadeInDown"
              duration={2000}
              delay={800}>
                <Animatable.Image source={logoImg} style={styles.imgLogo}
                animation="pulse"
                duration={1500}
                delay={2000}
                iterationCount="infinite"
                />
              </Animatable.View>

              <Animatable.Text style={styles.logo}
                animation="zoomIn"
                duration={2300}
                delay={1500}
              >
                lilacPay
              </Animatable.Text>
            </View>
            <ActivityIndicator size="large" color="#7318AB" />
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loading:{
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000a9',
    zIndex: 999,
  },
  conteudo:{
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 100,
    width: 235,
    height: 200,
  },
  animada:{
    width: 197,
    height: 194,
  },
  imgLogo:{
    width: 197,
    height: 194,
  },
  logo:{
    position: 'absolute',
    fontSize: 70,
    color: '#7318AB',
    fontFamily: 'InriaSans_400Regular'
  },
});


export default SplashSession;
