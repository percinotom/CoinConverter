import React, { useState } from 'react';
import { Modal, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { UseUser } from '../Context/UserContext';

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const { loginContext } = UseUser();
  const [mostrarMensagem, setMostrarMensagem] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (mensagem) => {
    setMostrarMensagem(mensagem);
    setModalVisible(!isModalVisible);
  };

  const handleLogin = () => {
    const data = {
      login: login,
      senha: senha,
    };

    fetch('http://coinconverter1.hospedagemdesites.ws/api_CoinConverter/Login/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          const userData = responseData.user;

          loginContext({
            id: userData.id,
            nome: userData.nome,
            login: userData.login,
            senha: '',
            logado: true,
          });

          setLogin('');
          setSenha('');

          navigation.navigate('Tabs');
        } else {
          toggleModal('Erro ao fazer login: ' + responseData.message);
        }
      })
      .catch((error) => {
        toggleModal('Erro ao fazer login. Tente novamente.');
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container2}>
          <View style={styles.posicaoTextoLogo}>
            <Text style={styles.textoLogo}>CoinConverter</Text>
          </View>
          <View>
            <View>
              <Text style={styles.texto}>Login</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setLogin(text)}
                placeholder="Digite o login"
                value={login} />
            </View>
            <View>
              <Text style={styles.texto}>Senha</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => setSenha(text)}
                placeholder="Digite a senha"
                value={senha} />
            </View>
            <TouchableOpacity
              style={styles.posicaoRegistrar}
              onPress={() => { navigation.navigate('Cadastro'); }}>
              <Text style={styles.registrar}>Registrar-se</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnEntrar} onPress={handleLogin}>
              <Text style={styles.btnTextoBotao}>Entrar</Text>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'cneter',
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
  btnEntrar: {
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