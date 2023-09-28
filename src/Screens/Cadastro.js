import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function RegistroScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleRegistro = () => {
        const data = {
            nome: nome,
            login: login,
            senha: senha,
        };

        fetch('https://apicoinconverter.000webhostapp.com/api_CoinConverter/registrar/registrar_post.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.success) {
                    alert('Registro bem-sucedido!');
                    navigation.navigate('Login');
                } else {
                    alert('Erro ao registrar. Tente novamente.');
                }
            })
            .catch((error) => {
                console.error('Erro ao registrar:', error);
                alert('Erro ao registrar. Tente novamente.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textoLogo}>CoinConverter</Text>
            <View>
                <View>
                    <Text style={styles.texto}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setNome(text)}
                        placeholder="Digite o nome"
                    />
                </View>
                <View>
                    <Text style={styles.texto}>Login</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setLogin(text)}
                        placeholder="Digite o login"
                    />
                </View>
                <View>
                    <Text style={styles.texto}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setSenha(text)}
                        placeholder="Digite a senha"
                        secureTextEntry
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.btnRegistrar} onPress={handleRegistro}>
                <Text style={styles.btnTextoBotao}>Registrar-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoLogo: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#17A600',
        marginBottom: 80,
    },
    input: {
        width: 320,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 13,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    texto: {
        fontSize: 18,
    },
    btnRegistrar: {
        backgroundColor: '#17A600',
        borderRadius: 5,
        width: 320,
        padding: 12,
    },
    btnTextoBotao: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
