import React, { useState } from 'react';
import { Modal, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function RegistroScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarMensagem, setMostrarMensagem] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (mensagem) => {
        setMostrarMensagem(mensagem);
        setModalVisible(!isModalVisible);
    };

    const validarCampos = () => {
        if (!nome || !login || !senha) {
            toggleModal('Todos os campos são obrigatórios.');
            return false;
        }

        if (!/^[a-zA-Z]+$/.test(nome)) {
            toggleModal('O campo de nome deve conter apenas letras.');
            return false;
        }

        if (nome.length < 3 || nome.length > 50) {
            toggleModal('O nome deve ter entre 3 e 50 caracteres.');
            return false;
        }

        if (login.length < 3 || login.length > 30) {
            toggleModal('O login deve ter entre 3 e 30 caracteres.');
            return false;
        }

        if (senha.length < 3 || senha.length > 30) {
            toggleModal('A senha deve ter entre 3 e 30 caracteres.');
            return false;
        }

        return true;
    };

    const handleRegistro = () => {
        if (!validarCampos()) {
            return;
        }

        const data = {
            nome: nome,
            login: login,
            senha: senha,
        };

        fetch('http://coinconverter1.hospedagemdesites.ws/api_CoinConverter/registrar/registrar_post.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.success) {
                    toggleModal('Registro bem-sucedido!');
                    setTimeout(() => {
                        navigation.navigate('Login');
                    }, 2000);
                } else {
                    toggleModal(responseData.message || 'Erro ao registrar. Tente novamente.');
                }
            })
            .catch((error) => {
                toggleModal('Erro ao registrar. Tente novamente.');
            });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.container2}>
                    <Text style={styles.textoLogo}>CoinConverter</Text>
                    <View>
                        <View>
                            <Text style={styles.texto}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setNome(text)}
                                placeholder="Digite o nome"
                                maxLength={50}
                            />
                        </View>
                        <View>
                            <Text style={styles.texto}>Login</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setLogin(text)}
                                placeholder="Digite o login"
                                maxLength={30}
                            />
                        </View>
                        <View>
                            <Text style={styles.texto}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setSenha(text)}
                                placeholder="Digite a senha"
                                secureTextEntry
                                maxLength={30}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnRegistrar} onPress={handleRegistro}>
                        <Text style={styles.btnTextoBotao}>Registrar-se</Text>
                    </TouchableOpacity>
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
}

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
    textoLogo: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#17A600',
        marginBottom: 80,
        textAlign: 'center',
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
        marginTop: 30,
    },
    btnTextoBotao: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itensCard: {
        backgroundColor: 'white',
        padding: 30,
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