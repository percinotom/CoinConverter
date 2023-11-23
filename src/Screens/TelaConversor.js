import React, { useState, useRef } from 'react';
import { Modal, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Table, Row, Rows } from 'react-native-table-component';
import { UseUser } from '../Context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function TelaConversor(props) {
    const { user } = UseUser();
    const navigation = useNavigation();
    const [favoritos, setFavoritos] = useState([]);
    const [expressao, setExpressao] = useState('');
    const [moedaOrigem, setMoedaOrigem] = useState('USD');
    const [moedaDestino, setMoedaDestino] = useState('BRL');
    const [resultado, setResultado] = useState('-');
    const expressaoInputRef = useRef(null);
    const [nome, setNome] = useState(user.nome);
    const [mostrarMensagem, setMostrarMensagem] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (mensagem) => {
        setMostrarMensagem(mensagem);
        setModalVisible(!isModalVisible);
    };

    const fetchFavoritos = async () => {
        try {
            const response = await fetch(`http://coinconverter1.hospedagemdesites.ws/api_CoinConverter/favoritos/favoritos_get.php?user_id=${user.id}`);
            const data = await response.json();
            setFavoritos(data);
            return data;
        } catch (error) {
            toggleModal('Erro ao carregar favoritos.');
        }
    };

    const isResultadoValido = resultado !== '-' && resultado !== 'Erro ao calcular a conversão' && !isNaN(parseFloat(resultado));

    const handleFavoritar = () => {
        if (isResultadoValido) {
            const favorito = {
                favorito: resultado,
                usuario_id: user.id,
            };

            fetch('http://coinconverter1.hospedagemdesites.ws/api_CoinConverter/favoritos/favoritos_post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(favorito),
            })
                .then((response) => {
                    if (response.status === 200) {
                        fetchFavoritos().then((novosFavoritos) => {
                            navigation.navigate('TelaFavoritos', { novosFavoritos });
                        });
                    } else {
                        toggleModal('Erro ao favoritar. ' + response.status);
                    }
                })
                .catch((error) => {
                    toggleModal('Erro ao favoritar. ', error);
                });
        } else {
            toggleModal('Resultado inválido. Não é possível favoritar.');
        }
    };

    const calcularConversao = async () => {
        try {
            const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${moedaOrigem}-${moedaDestino}`);
            const data = await response.json();

            const taxaDeCambio = data[`${moedaOrigem}${moedaDestino}`].bid;

            const valorConvertido = parseFloat(expressao) * parseFloat(taxaDeCambio);
            setResultado(`${expressao} ${moedaOrigem} = ${valorConvertido.toFixed(2)} ${moedaDestino}`);
        } catch (error) {
            setResultado('Erro ao calcular a conversão');
        }
    };

    const tableHead = ['Resultado'];
    const tableData = [[resultado]];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.container2}>
                    <View>
                        <View>
                            <Text style={styles.textoBemVindo} >Olá {user.nome}, bem vindo!</Text>
                        </View>
                        <Text style={styles.texto} >Valor a converter</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setExpressao(text)}
                            placeholder="Digite o valor"
                            ref={expressaoInputRef}
                            keyboardType='numeric'
                        />
                    </View>
                    <View>
                        <Text style={styles.texto}>Moeda para conversão</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={moedaOrigem}
                                onValueChange={(itemValue) => setMoedaOrigem(itemValue)}>
                                <Picker label="Dólar Americano" value="USD" />
                                <Picker label="Euro" value="EUR" />
                                <Picker label="Dólar Canadense" value="CAD" />
                                <Picker label="Real Brasileiro" value="BRL" />
                                <Picker label="Peso Argentino" value="ARS" />
                                <Picker label="Bitcoin" value="BTC" />
                                <Picker label="Iene Japonês" value="JPY" />
                            </Picker>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.texto}>Moeda a ser convertida</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={moedaDestino}
                                onValueChange={(itemValue) => setMoedaDestino(itemValue)}>
                                <Picker label="Dólar Americano" value="USD" />
                                <Picker label="Euro" value="EUR" />
                                <Picker label="Dólar Canadense" value="CAD" />
                                <Picker label="Real Brasileiro" value="BRL" />
                                <Picker label="Peso Argentino" value="ARS" />
                                <Picker label="Iene Japonês" value="JPY" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.centralizaBotoesMoeda}>
                        <TouchableOpacity
                            style={styles.btnLimpar}
                            onPress={() => {
                                setExpressao('');
                                setMoedaOrigem('USD');
                                setMoedaDestino('BRL');
                                setResultado('-');
                                expressaoInputRef.current.clear();
                            }}>
                            <Text style={styles.btnTextoBotao}>Limpar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnCalcular}
                            onPress={calcularConversao}>
                            <Text style={styles.btnTextoBotao}>Calcular</Text>
                        </TouchableOpacity>
                    </View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#000' }}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                        <Rows data={tableData} textStyle={styles.text} />
                    </Table>
                    <View style={styles.favoritarContainer}>
                        <TouchableOpacity
                            style={[styles.btnFavoritar, !isResultadoValido && styles.btnFavoritarDisabled]}
                            onPress={handleFavoritar}
                            disabled={!isResultadoValido}>
                            <Text style={styles.btnTextoBotao}>Favoritar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isModalVisible && (
                    <View style={styles.overlay}>
                        <Modal
                            visible={isModalVisible}
                            transparent={true}
                            animationType="slide"
                        >
                            <View style={styles.card}>
                                <View style={styles.itensCard}>
                                    <Text style={styles.texto}>{mostrarMensagem}</Text>
                                    <View style={styles.centralizaBotoes}>
                                        <TouchableOpacity style={styles.btnVoltar} onPress={toggleModal}>
                                            <Text style={styles.btnTextoBotao}>OK</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        paddingHorizontal: 50,
    },
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    btnFavoritarDisabled: {
        backgroundColor: '#ccc',
    },
    picker: {
        width: 320,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 13,
        borderRadius: 5
    },
    centralizaBotoesMoeda: {
        marginTop: 5,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textoLogo: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#17A600'
    },
    posicaoTextoLogo: {
        marginBottom: 80
    },
    input: {
        width: 320,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 13,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    texto: {
        fontSize: 18,
    },
    textoBemVindo: {
        fontSize: 30,
        color: '#17A600',
        fontWeight: 'bold',
        marginBottom: 50,
    },
    btnCalcular: {
        backgroundColor: '#17A600',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 25
    },
    btnLimpar: {
        backgroundColor: '#8C8C8C',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 25
    },
    btnTextoBotao: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    head: {
        height: 40,
        backgroundColor: '#17A600',
    },
    headText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    text: {
        margin: 10,
        fontSize: 24,
        textAlign: 'center'
    },
    favoritarContainer: {
        alignItems: 'flex-end',
    },
    btnFavoritar: {
        backgroundColor: '#17A600',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginTop: 10,
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itensCard: {
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1
    },
    texto: {
        fontSize: 22,
    },
    btnVoltar: {
        backgroundColor: '#17A600',
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 10,
    },
    centralizaBotoes: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});