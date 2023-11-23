import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { AntDesign } from '@expo/vector-icons';
import { UseUser } from '../Context/UserContext';
import { useRoute } from '@react-navigation/native';

export default function FavoritosScreen() {
  const { user } = UseUser();
  const [favoritos, setFavoritos] = useState([]);
  const route = useRoute();
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
      toggleModal('Erro ao carregar favoritos. ', error);
    }
  };

  useEffect(() => {
    const params = route.params;
    if (params && params.novosFavoritos) {
      setFavoritos(params.novosFavoritos);
    } else {
      fetchFavoritos();
    }
  }, [route]);


  const handleDeleteFavorito = (favorito_id, index) => {
    fetch('http://coinconverter1.hospedagemdesites.ws/api_CoinConverter/favoritos/favoritos_delete.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorito_id, user_id: user.id }),
    })
      .then((response) => {
        if (response.status === 200) {
          const novosFavoritos = [...favoritos];
          novosFavoritos.splice(index, 1);
          setFavoritos(novosFavoritos);
          fetchFavoritos();
        } else {
          toggleModal('Erro ao excluir o favorito. ' + response.status);
        }
      })
      .catch((error) => {
        toggleModal('Erro ao excluir favorito. ', error);
      });
  };

  const tableHead = ['Resultados Salvos'];
  const tableData = favoritos.map((favorito, index) => {
    return [
      `${favorito.expressao}`,
      `${favorito.data}`,
      <TouchableOpacity
        onPress={() => handleDeleteFavorito(favorito.id, index)}
        style={styles.iconeExcluir}
      >
        <AntDesign name="delete" size={16} color="red" />
      </TouchableOpacity>,
    ];
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container2}>
          <View>
            <Table style={{ width: 320 }} borderStyle={{ borderWidth: 1, borderColor: '#000' }}>
              <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
              <Rows data={tableData} textStyle={styles.text} />
            </Table>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  head: {
    height: 40,
    backgroundColor: '#17A600',
  },
  headText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    margin: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  iconeExcluir: {
    alignItems: 'center',
    justifyContent: 'center',
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