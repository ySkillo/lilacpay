import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, Alert, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from "../assets/css/exibir/exibir";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from 'react-native';
import sqLiteSession from '../conect/sqLiteSession';
import sqLiteUser from '../conect/sqLiteUser';
import sqLiteRenda from '../conect/sqLiteRenda';
import sqlLiteDadosFicticios from "../conect/sqlLiteDadosFicticios";
const { deleteFatura, loadDeletedInvoices } = sqlLiteDadosFicticios;

function ExibirScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [fictitiousData, setFictitiousData] = useState(null);
    const [deletedInvoices, setDeletedInvoices] = useState([]);
    const [valor, setValor] = useState('');
    const [selectedFatura, setSelectedFatura] = useState(null);
    const [mostrarConteudo, setMostrarConteudo] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [codigoUsuario, setCodigoUsuario] = useState('');

    console.log('digitado:', codigoUsuario)

    const loadSpecificUser = useCallback(() => {
        sqLiteSession.getSession()
            .then(session => {
                if (session) {
                    sqLiteUser.getUsuarioById(session.userId)
                        .then(usuario => {
                            setUsuario(usuario);
                            loadFictitious(session.userId);
                            loadDeletedFaturas(session.userId);
                            setMostrarConteudo(true);
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

    useFocusEffect(
        useCallback(() => {
            loadSpecificUser();
        }, [])
    );



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
        setModalVisible(true);
    };

    const handleConfirmarPagamento = () => {
        if (String(codigoUsuario) !== String(usuario.codigo)) {
            Alert.alert('Código Inválido', 'Por favor, insira o código do usuário corretamente.');
            return;
        }

        const valorFatura = parseFloat(valor.replace(',', '.'));

        if (isNaN(valorFatura) || !isFinite(valorFatura)) {
            Alert.alert('Valor Inválido', 'Por favor, insira um valor válido para a fatura.');
            return;
        }

        const saldoUsuario = usuario.renda;

        if (saldoUsuario >= valorFatura) {
            const valorFaturaOriginal = parseFloat(selectedFatura.amount.replace('.', '').replace(',', '.'));
            if (valorFaturaOriginal === valorFatura) {
                const novoSaldo = saldoUsuario - valorFatura;

                sqLiteRenda.updateRenda(usuario.id, novoSaldo)
                    .then(() => {
                        deleteFatura(selectedFatura.id, usuario.id, () => {
                            console.log('Pagamento efetuado!');
                            setValor('');
                            setSelectedFatura(null);
                            setMostrarConteudo(false);
                            loadFictitious(usuario.id);
                            loadDeletedFaturas(usuario.id);
                            setModalVisible(false);
                            setIsLoading(true);
                            setTimeout(() => {
                                console.log('Carregamento Concluído');
                                navigation.navigate('Home');
                                setIsLoading(false);
                            }, 2000);

                        });
                        
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar o saldo do usuário:', error.message);
                    });
            } else {
                Alert.alert('Valor Incorreto', 'O valor digitado não corresponde ao valor da fatura.');
                setModalVisible(false);
            }
        } else {
            Alert.alert('Saldo Insuficiente', 'Saldo insuficiente para pagar a fatura.');
            setModalVisible(false);
        }
    };

    const formatarRenda = (valor) => {
        const numeroLimpo = valor.replace(/\D/g, '');
        const numeroFormatado = new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numeroLimpo / 100);

        return numeroFormatado;
    };

    const formatarCPF = (cpf) => {
        // Remove todos os caracteres não numéricos do CPF
        const cpfLimpo = cpf.replace(/\D/g, '');

        // Aplica a máscara do CPF (###.###.###-##)
        return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatarCNPJ = (cnpj) => {
        // Verifica se o CNPJ tem a formatação correta
        if (cnpj.length !== 14) {
            return "CNPJ inválido";
        }

        // Aplica a máscara
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            {isLoading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#7318AB" />
                </View>
            )}
            <View style={styles.conteudo1}>
                <Text style={styles.logo}>lilacPay</Text>
            </View>
            <View style={styles.conteudo2}>
                {selectedFatura && (
                    <View style={styles.fictitiousContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.label}>INSTITUIÇÃO:</Text>
                            <Text style={styles.otherText}>{selectedFatura.payerName}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.label}>LOCAL:</Text>
                            <Text style={styles.otherText}>{selectedFatura.recipientName}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.label}>CPF:</Text>
                            <Text style={styles.otherText}>{formatarCPF(selectedFatura.payerDocument)}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.labelValor}>Valor:</Text>
                            <Text style={styles.preco}>{`R$ ${selectedFatura.amount}`}</Text>
                        </View>
                        {usuario && (
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Saldo:</Text>
                                <Text style={styles.otherText}>{formatRenda(usuario.renda)}</Text>
                            </View>
                        )}
                        <View style={styles.inputs}>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o valor da fatura"
                                keyboardType="numeric"
                                value={valor}
                                autoFocus={true}
                                maxLength={16}
                                onChangeText={handleChange}
                            />
                            <Text style={styles.rs}>R$</Text>
                            {selectedFatura && (
                                <Pressable onPress={handlePagarPress} style={styles.btnEnviar}>
                                    <Ionicons
                                        name='arrow-forward'
                                        size={30}
                                        color='#fff'
                                    />
                                </Pressable>
                            )}
                        </View>
                    </View>
                )}

                {mostrarConteudo && fictitiousData && (
                    <View style={styles.fictitiousContainer}>
                        <Text style={styles.rendaText}>Dados da transferência:</Text>
                        {fictitiousData.map((item, index) => (
                            <View key={index}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.label}>INSTITUIÇÃO:</Text>
                                    <Text style={styles.otherText}>{item.payerName}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.label}>CNPJ:</Text>
                                    <Text style={styles.otherText}>{formatarCNPJ(item.recipientDocument)}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.label}>LOCAL:</Text>
                                    <Text style={styles.otherText}>{item.recipientName}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.label}>CPF:</Text>
                                    <Text style={styles.otherText}>{formatarCPF(item.payerDocument)}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.labelValor}>Valor:</Text>
                                    <Text style={styles.preco}>{`R$ ${item.amount}`}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {mostrarConteudo && fictitiousData && (
                    <View style={styles.conteudo3}>
                        <View style={styles.btn}>
                            {fictitiousData.map((item, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => [setSelectedFatura(item), setMostrarConteudo(false)]}
                                >
                                    <Ionicons
                                        name='chevron-forward'
                                        size={30}
                                        color='#fff'
                                    />
                                </Pressable>
                            ))}
                        </View>
                    </View>
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <View style={styles.conteudoModal1}>
                            <Text style={styles.modalTitle}>Confirme</Text>
                            <Text style={styles.modalTitle2}>seu Código</Text>
                        </View>
                        
                        <View style={styles.codigoContainer}>
                            {[0, 1, 2, 3].map(index => (
                               <TextInput
                               key={index}
                               style={[styles.modalInput, codigoUsuario[index] === undefined || codigoUsuario[index] === '' || isNaN(parseInt(codigoUsuario[index])) ? styles.invalidInput : null]}
                               placeholder="0"
                               keyboardType="numeric"
                               maxLength={1}
                               value={codigoUsuario[index] || ''}
                               onChangeText={text => {
                                   const newCodigoUsuario = [...codigoUsuario]; // Criando uma cópia do estado atual
                                   newCodigoUsuario[index] = text; // Atualizando o valor do índice atual
                                   const codigoString = newCodigoUsuario.join(''); // Convertendo o array para uma única string
                                   setCodigoUsuario(codigoString); // Atualizando o estado com a nova string
                               }}
                           />
                            
                            ))}
                        </View>
                        <View style={styles.alinhamento}>
                            
                            <Pressable onPress={() => setCodigoUsuario(['', '', '', ''])} style={styles.clearBtn}>
                                <Text style={styles.clearBtnText}>Limpar</Text>
                            </Pressable>
                            <Pressable onPress={handleConfirmarPagamento} style={styles.modalBtn}>
                                <Ionicons
                                    name='checkmark'
                                    size={30}
                                    color='#fff'
                                />
                            </Pressable>
                        </View>
                    
                    </View>
                </View>


            </Modal>

            {/* {usuario && (
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Codigo:</Text>
                    <Text style={styles.otherText}>{usuario.codigo}</Text>
                </View>
            )} */}

        </KeyboardAvoidingView>
    );
}

export default ExibirScreen;
