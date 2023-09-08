import React, { useState, useRef } from 'react';
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Table, Row, Rows } from 'react-native-table-component';

export default props => {
    const [expressao, setExpressao] = useState('');
    const [moedaOrigem, setMoedaOrigem] = useState('USD');
    const [moedaDestino, setMoedaDestino] = useState('BRL');
    const [resultado, setResultado] = useState('-');
    const expressaoInputRef = useRef(null);

    const calcularConversao = async () => {
        try {
            const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${moedaOrigem}-${moedaDestino}`);
            const data = await response.json();
            
            const taxaDeCambio = data[`${moedaOrigem}${moedaDestino}`].bid;

            const valorConvertido = parseFloat(expressao) * parseFloat(taxaDeCambio);
            setResultado(`${expressao} ${moedaOrigem} = ${valorConvertido.toFixed(2)} ${moedaDestino}`);
        } catch (error) {
            console.error('Erro ao calcular a conversão:', error);
            setResultado('Erro ao calcular a conversão');
        }
    };

    const tableHead = ['Resultado'];
    const tableData = [[resultado]];

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.texto}>Valor a converter</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setExpressao(text)}
                        placeholder="Digite o valor"
                        ref={expressaoInputRef}
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
                <View style={styles.centralizaBotoes}>
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
                        style={styles.btnFavoritar}
                        onPress={calcularConversao}>
                        <Text style={styles.btnTextoBotao}>Favoritar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        width: 320,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 13,
        borderRadius: 5
    },
    centralizaBotoes: {
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
    }
});