import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, Image, Pressable, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from "../assets/css/home/home";
import sqLiteSession from '../conect/sqLiteSession';
import sqLiteUser from '../conect/sqLiteUser';
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator } from 'react-native';


import seta from '../assets/img/seta.png';
import card2 from '../assets/img/agasalhoImg.jpeg.png';
import card1 from '../assets/img/imagemLilacPay.jpeg.png';
import card3 from '../assets/img/cartaoImg.png';

import extrato from '../assets/img/icon/extrato.png';
import pix from '../assets/img/icon/pix.png';
import cartao from '../assets/img/icon/cartao.png';
import pagar from '../assets/img/icon/pagar.png';
import emprestimo from '../assets/img/icon/emprestimo.png';


import sqlLiteDadosFicticios from "../conect/sqlLiteDadosFicticios"; // Importe o objeto padrão



function HomeScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [mostrarRenda, setMostrarRenda] = useState(false);
    const [fictitiousData, setFictitiousData] = useState(null); // Estado para armazenar os dados fictícios

    const flatListRef = useRef(null); // Referência para a FlatList
    const [currentIndex, setCurrentIndex] = useState(0); // Estado para o índice atual



    const loadSpecificUser = () => {
        sqLiteSession.getSession()
            .then(session => {
                if (session) {
                    sqLiteUser.getUsuarioById(session.userId)
                        .then(usuario => {
                            setUsuario(usuario);
                            loadFictitious(session.userId); // Chama loadFictitious com o userId do usuário logado
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
    };
    


    // Função para carregar os dados fictícios
    // Função para carregar os dados fictícios de acordo com o usuário logado
    const loadFictitious = (userId) => {
        sqlLiteDadosFicticios.loadFictitiousData(userId) // Passa o userId para a função loadFictitiousData
            .then(data => {
                setFictitiousData(data); // Define os dados fictícios no estado
            })
            .catch(error => {
                console.log('Erro ao carregar dados fictícios:', error.message);
            });
    };



    useFocusEffect(
        useCallback(() => {
            loadSpecificUser();
            loadFictitious();
        }, [])
    );

    const logout = () => {
        sqLiteSession.endSession()
            .then(() => {

                console.log('Botão de (sair) pressionado');
                setIsLoading(true);
                setTimeout(() => {
                    console.log('Carregamento Concluído');
                    navigation.navigate('Perfil');
                    setIsLoading(false);
                }, 2000);
            })
            .catch(error => {
                console.error('Erro ao encerrar sessão:', error.message);
            });
    };



    const icons = [
        {
            id: 1,
            textos: 'Extrato',
            ico: extrato,
        },
        {
            id: 2,
            textos: 'Pix',
            ico: 'notifications-outline',
            ico: pix,
        },
        {
            id: 3,
            textos: 'Cartão',
            ico: cartao,

        },
        {
            id: 4,
            textos: 'Pagar',
            ico: pagar,
        },
        {
            id: 5,
            textos: 'Emprestimo',
            ico: emprestimo,
        },



        // Adicione mais ofertas conforme necessário
    ];

    const renderIcons = ({ item }) => (
        <Pressable 
            style={styles.containerOp} 
            onPress={() => {
                if (item.textos === 'Pagar') {
                    navigation.navigate('Pagamento');
                }else if(item.textos === 'Extrato'){
                    navigation.navigate('Extrato');
                }
            }}
        >
            <View style={styles.opcao}>
                <Image source={item.ico} style={styles.iconsImg} />
            </View>
            <Text style={styles.textOpcao}>{item.textos}</Text>
        </Pressable>
    );



    const offers = [
        {
            id: 1,
            title: 'Chegou no LilacPay a Conta para menores',
            buttonText: 'Saiba mais',
            image: card1,
            color: '#fff',
            textCor: '#7318AB',
        },
        {
            id: 2,
            title: 'Sua doação vai aquecer muitas familias e corações',
            buttonText: 'Saiba mais',
            image: card2,
            color: '#FC540F',
            textCor: '#fff',
        },
        {
            id: 3,
            title: 'Crie já seu cartão físico LilacPay!',
            buttonText: 'Saiba mais',
            image: card3,
            color: '#7318AB',
            textCor: '#fff',
        },
        // Adicione mais ofertas conforme necessário
    ];



    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: item.color }]}>
            <View style={styles.textosCard}>
                <Text style={[styles.textCard, { color: item.textCor }]}>{item.title}</Text>
                <View style={styles.span}>
                    <Text style={[styles.textCard, { color: item.textCor }]}>{item.buttonText}</Text>
                    <Ionicons name='chevron-forward'
                        size={15}
                        color={item.textCor}
                    />
                </View>
            </View>
            <Image source={item.image} style={styles.imgCard} />
        </View>
    );


    // Configuração do auto-scroll
    useEffect(() => {
        const interval = setInterval(() => {
            if (flatListRef.current && offers.length > 0) {
                const nextIndex = (currentIndex + 1) % offers.length;
                setCurrentIndex(nextIndex);
                flatListRef.current.scrollToOffset({
                    offset: nextIndex * 400, // Largura do item (ajuste conforme necessário)
                    animated: true,
                });
            }
        }, 2000); // Tempo em milissegundos entre cada rolagem (ajuste conforme necessário)

        return () => clearInterval(interval);
    }, [currentIndex, offers.length]);




    const servicos = [
        {
            id: 1,
            textServ: 'Seguros',
            ico: 'shield',
        },
        {
            id: 2,
            textServ: 'Poupança',
            ico: 'lock-closed',

        },
        {
            id: 3,
            textServ: 'Recarga de Celular',
            ico: 'phone-portrait-outline',

        },
        {
            id: 4,
            textServ: 'Investir',
            ico: 'stats-chart-outline',

        },
        {
            id: 5,
            textServ: 'Doações',
            ico: 'heart-outline',
        },
        {
            id: 6,
            textServ: 'Pagamento de Contas',
            ico: 'cash-outline',
        },
        {
            id: 7,
            textServ: 'Transferência',
            ico: 'swap-horizontal-outline',
        },
        {
            id: 8,
            textServ: 'Empréstimos',
            ico: 'briefcase-outline',
        },
        {
            id: 9,
            textServ: 'Cartão de Crédito',
            ico: 'card-outline',
        },
        {
            id: 10,
            textServ: 'Consultoria FNC',
            ico: 'people-outline',
        },
        {
            id: 11,
            textServ: 'Planejamento FNC',
            ico: 'calculator-outline',
        },
        

        // Adicione mais ofertas conforme necessário
    ];

    const renderService = ({ item }) => (
        <View style={styles.servicos}>
            <Ionicons name={item.ico}
                size={40}
                color="#510A7D"
            />
            <Text style={styles.textServicos}>{item.textServ}</Text>
        </View>
    );


    const servicosTwo = [
        {
            id: 1,
            textServ: 'Vianges',
            ico: 'airplane-outline',
        },
        {
            id: 2,
            textServ: 'Conta Global',
            ico: 'earth',

        },
        {
            id: 3,
            textServ: 'Financiar',
            ico: 'home-outline',

        },
        {
            id: 4,
            textServ: 'Recarga de Bilhete',
            ico: 'train-outline',

        },
        {
            id: 5,
            textServ: 'Aposentadoria',
            ico: 'time-outline',
        },
        {
            id: 6,
            textServ: 'Criptomoedas',
            ico: 'logo-bitcoin',
        },
        {
            id: 7,
            textServ: 'Educação Financeira',
            ico: 'school-outline',
        },
        {
            id: 8,
            textServ: 'Assistência Téc',
            ico: 'construct-outline',
        },
        {
            id: 9,
            textServ: 'Vendas',
            ico: 'cart-outline',
        }
        // Adicione mais ofertas conforme necessário
    ];
    const renderServiceTwo = ({ item }) => (
        <View style={styles.servicos}>
            <Ionicons name={item.ico}
                size={40}
                color="#510A7D"
            />
            <Text style={styles.textServicos}>{item.textServ}</Text>
        </View>
    );

    // Função para obter as iniciais do nome do usuário
    const getIniciais = (nome) => {
        if (!nome) return "";
        const partesNome = nome.split(" ");
        if (partesNome.length < 2) return ""; // Retorna vazio se o nome não contiver pelo menos duas partes
        return partesNome[0].charAt(0).toUpperCase() + partesNome[partesNome.length - 1].charAt(0).toUpperCase();
    };

    // Função para formatar a renda
    const formatRenda = (valor) => {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });
    };

    // Função para mascarar os números da renda
    const maskRenda = (valor) => {
        return valor.replace(/[\d.,]/g, '*');
    };


    return (
        <View style={styles.container}>
            {/* Exibir dados salvos usuario!! */}
            {/* Renderizando os outros campos fictícios da mesma forma */}
            {/* <View style={styles.testeFaturas}>
                {usuario && (
                    <View>
                        <Text style={styles.testeText}>Usuário:</Text>
                        <Text style={styles.testeInfo}>{usuario.nome}</Text>
                        <Text style={styles.testeInfo}>{usuario.email}</Text>
                        <Text style={styles.testeInfo}>{usuario.telefone}</Text>
                        <Text style={styles.testeInfo}>{usuario.cpf}</Text>
                        <Text style={styles.testeInfo}>{usuario.dataNascimento}</Text>
                    </View>
                )}
                
                {usuario && (
                    <View>
                        <Text style={styles.testeText}>Renda:</Text>
                        <Text style={styles.testeInfo}>{formatRenda(usuario.renda)}</Text>
                    </View>
                )}

                {fictitiousData && (

                    <View>
                        <Text style={styles.testeText}>Dados Fictícios:</Text>
                        {fictitiousData.map((item, index) => (
                            <View key={index}>
                                <Text style={styles.testeInfo}>{`Instituição: ${item.payerName}`}</Text>
                                <Text style={styles.testeInfo}>{`CNPJ: ${item.recipientDocument}`}</Text>                
                                <Text style={styles.testeInfo}>{`Recipiente: ${item.recipientName}`}</Text>
                                <Text style={styles.testeInfo}>{`Valor: ${item.amount}`}</Text>
                                <Text style={styles.testeInfo}>{`CPF: ${item.payerDocument}`}</Text>
                                <Text style={styles.testeInfo}>______________________________________________</Text>

                            </View>
                        ))}
                    </View>
                )}
            </View> */}
















            {isLoading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#7318AB" />
                </View>
            )}
            {/* Exibir usuario / sair */}
            <View style={styles.conteudo1}>
                <View style={styles.topo}>
                    <View style={styles.icoConNav}>
                        <Ionicons name='notifications-outline'
                            size={25}
                            color="#510A7D"
                        />
                    </View>
                    <Text style={styles.logo}>lilacPay</Text>
                    <View style={styles.icoConNav}>
                        <Ionicons name='settings-outline'
                            size={30}
                            color="#510A7D"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.conteudo2}>
                <View style={styles.infoUser}>
                    <View style={styles.perfil}>
                        <Text style={styles.abreviacao}>{getIniciais(usuario?.nome)}</Text>
                    </View>
                    {usuario && (
                        <View style={styles.nomeAlinamento}>
                            <Text style={styles.nomeUser}>{usuario.nome}</Text>
                            <Text style={styles.textEmail}>{usuario.email}</Text>
                            <Pressable onPress={logout}>
                                <Text style={styles.titulo}>
                                    <Ionicons name="log-out-outline" size={24} color="#fff" />
                                </Text>
                            </Pressable>
                        </View>
                    )}

                </View>
            </View>
            <View style={styles.conteudo3}>
                <View style={styles.boxLabel}>
                    <Text style={styles.label}>SALDO CONTA-CORRENTE</Text>
                    {usuario && (
                        <Text style={styles.textRenda}>
                            {mostrarRenda ? formatRenda(usuario.renda) : maskRenda(formatRenda(usuario.renda))}
                        </Text>
                    )}
                </View>
                <Pressable
                    style={styles.visualizar}
                    onPress={() => setMostrarRenda(!mostrarRenda)}
                >
                    <Ionicons
                        name={mostrarRenda ? "eye" : "eye-off"} // Alterna o ícone com base no estado
                        size={24}
                        color="#fff"
                    />

                </Pressable>
            </View>
            <View style={styles.conteudo4}>
                <View style={styles.opcoes}>
                    <FlatList
                        data={icons}
                        renderItem={renderIcons}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true} // Configura a FlatList para mover-se horizontalmente
                        contentContainerStyle={{ gap: 20, height: '100%', }} // Adiciona espaço horizontal ao redor dos itens
                    />
                </View>
            </View>
            <View style={styles.conteudo5}>
                <Text style={styles.titulo}>Ofertas</Text>
                <FlatList
                    ref={flatListRef}
                    data={offers}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true} // Configura a FlatList para mover-se horizontalmente
                    contentContainerStyle={{ justifyContent: 'center', gap: 20, paddingLeft: 20, paddingRight: 20, }} // Adiciona espaço horizontal ao redor dos itens
                />
            </View>
            <View style={styles.conteudo6}>
                <Text style={styles.titulo}>Todos os serviços</Text>
                <View style={styles.services}>
                    <FlatList
                        data={servicos}
                        renderItem={renderService}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true} // Configura a FlatList para mover-se horizontalmente
                        contentContainerStyle={{ gap: 80, paddingRight: 50, paddingLeft: 30, }} // Adiciona espaço horizontal ao redor dos itens
                    />
                </View>
                <View style={styles.services}>
                    <FlatList
                        data={servicosTwo}
                        renderItem={renderServiceTwo}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true} // Configura a FlatList para mover-se horizontalmente
                        contentContainerStyle={{ gap: 80, paddingRight: 50, paddingLeft: 30, }} // Adiciona espaço horizontal ao redor dos itens
                    />
                </View>
            </View>
        </View>
    );
}

export default HomeScreen;
