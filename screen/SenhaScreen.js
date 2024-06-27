import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import sqLiteSession from '../conect/sqLiteSession';
import sqLiteUser from '../conect/sqLiteUser';
import sqlLiteDadosFicticios from "../conect/sqlLiteDadosFicticios";
const { loadDeletedInvoices } = sqlLiteDadosFicticios;
import styles from "../assets/css/senha/senha";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";


function SenhaScreen({ navigation }) {
    const [usuario, setUsuario] = useState(null);
    const [fictitiousData, setFictitiousData] = useState(null);
    const [deletedInvoices, setDeletedInvoices] = useState([]);
    const [codigoInput, setCodigoInput] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const loadSpecificUser = useCallback(() => {
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
    }, [navigation]);

    const loadFictitious = useCallback((userId) => {
        sqlLiteDadosFicticios.loadFictitiousData(userId)
            .then(data => {
                setFictitiousData(data);
            })
            .catch(error => {
                console.log('Erro ao carregar dados fictícios:', error.message);
            });
    }, []);

    const loadDeletedFaturas = useCallback((userId) => {
        loadDeletedInvoices(userId)
            .then(data => {
                setDeletedInvoices(data);
            })
            .catch(error => {
                console.log('Erro ao carregar faturas deletadas:', error.message);
            });
    }, []);

    useFocusEffect(loadSpecificUser);

    const handleCodigoChange = (text, index) => {
        const newCodigoInput = [...codigoInput];
        newCodigoInput[index] = text;
        setCodigoInput(newCodigoInput);

        if (text && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleUpdateCodigo = () => {
        const codigo = codigoInput.join('');
        if (codigo.length === 4 && usuario) {
            sqLiteUser.updateCodigo(usuario.id, codigo)
                .then(() => {
                    console.log('Código atualizado com sucesso');
                    navigation.navigate('Home');
                })
                .catch(error => {
                    console.log('Erro ao atualizar código:', error.message);
                });
        } else {
            Alert.alert('Código inválido, preencha todos os campos!');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.conteudo1}>
                <Ionicons
                    name='arrow-back'
                    size={30}
                    color='#7318AB'
                />
            </View>
            <View style={styles.conteudo2}>
                <Text style={styles.text1}>Digite sua</Text><Text style={styles.text2}>senha de 4 digitos</Text>
            </View>
            <View style={styles.conteudo3}>
                {usuario && (
                    <View>
                        <View style={styles.codigoContainer}>
                            {codigoInput.map((value, index) => (
                                <TextInput
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    style={styles.codigoInput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    value={value}
                                    onChangeText={(text) => handleCodigoChange(text, index)}
                                />
                            ))}
                        </View>

                        <Animatable.View
                            animation="zoomIn"
                            duration={2000}
                            delay={1000}
                        >
                            <Pressable onPress={handleUpdateCodigo} style={styles.btnEnviarCod}>
                                <Ionicons
                                    name='chevron-forward'
                                    size={35}
                                    color='#fff'
                                />
                            </Pressable>
                        </Animatable.View>
                        
                    </View>
                )}

                <View>
                {usuario && (
                    <Text style={styles.text1}>
                        {usuario.codigo}

                    </Text>
                )}
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}


export default SenhaScreen;
