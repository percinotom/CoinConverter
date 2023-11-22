import React, { useState } from 'react';
import { Modal, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { UseUser } from '../Context/UserContext';

export default function EditarPerfil({ navigation }) {
    const { user, loginContext } = UseUser();
    const [nome, setNome] = useState(user.nome);
    const [login, setLogin] = useState(user.login);
    const [senha, setSenha] = useState(user.senha);
    const [mostrarMensagem, setMostrarMensagem] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (mensagem) => {
        setMostrarMensagem(mensagem);
        setModalVisible(!isModalVisible);
    };

    const salvarPerfil = () => {
        const data = {
            id: user.id,
            nome: nome,
            login: login,
            senha: senha,
        };

        const jsonData = JSON.stringify(data);

        fetch('http://coinconverter1.hospedagemdesites.ws/api_CoinConverter/registrar/registrar_put.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Erro ao atualizar o perfil');
                }
            })
            .then((responseData) => {
                loginContext({
                    ...user,
                    nome: data.nome,
                    login: data.login,
                    senha: data.senha,
                });
                toggleModal('Perfil atualizado com sucesso!');
                navigation.navigate('Tabs');
            })
            .catch((error) => {
                console.error('Erro ao atualizar o perfil:', error);
                setMostrarMensagem('Erro ao atualizar o perfil: ' + error.message);
            });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.container2}>
                    <View style={styles.posicaoTextoLogo}>
                        <Text style={styles.textoLogo}>Editar Perfil</Text>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.texto}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setNome(text)}
                                placeholder="Digite o nome" >{user.nome}</TextInput>
                        </View>
                        <View>
                            <Text style={styles.texto}>Login</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setLogin(text)}
                                placeholder="Digite o login" >{user.login}</TextInput>
                        </View>
                        <View>
                            <Text style={styles.texto}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text) => setSenha(text)}
                                placeholder="Digite a senha" >{user.senha}</TextInput>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnSalvar} onPress={salvarPerfil}>
                        <Text style={styles.btnTextoBotao}>Salvar</Text>
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
        textAlign: 'center',
    },
    posicaoTextoLogo: {
        marginBottom: 80
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
    btnSalvar: {
        backgroundColor: '#17A600',
        borderRadius: 5,
        width: 320,
        padding: 12,
        marginTop: 50,
    },
    btnTextoBotao: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    posicaoRegistrar: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    registrar: {
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        textDecorationColor: '#000',
        fontSize: 16
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