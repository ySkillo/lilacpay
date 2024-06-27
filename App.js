import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, InriaSans_400Regular } from '@expo-google-fonts/inria-sans';

import SplashScreen from './screen/SplashScreen';
import AcessoScreen from './screen/AcessoScreen';
import LoginScreen from './screen/LoginScreen';
import PerfilScreen from './screen/PerfilScreen';
import HomeScreen from './screen/HomeScreen';
import TesteScanner from './screen/TesteScanner';
import PagamentoScreen from './screen/PagamentoScreen';
import ExibirScreen from './screen/ExibirScreen';
import SenhaScreen from './screen/SenhaScreen';
import ExtratoScreen from './screen/ExtratoScreen';




import RendaScreen from './screen/RendaScreen';

import ExemploScreen from './screen/ExemploSession';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fonteLoaded] = useFonts({
      InriaSans_400Regular
    })
    if(!fonteLoaded){
      return null;
    }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Acesso" component={AcessoScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Exemplo" component={ExemploScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Renda" component={RendaScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Scanner" component={TesteScanner} options={{ headerShown: false }} /> 
        <Stack.Screen name="Exibir" component={ExibirScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Pagamento" component={PagamentoScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Senha" component={SenhaScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Extrato" component={ExtratoScreen} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}


