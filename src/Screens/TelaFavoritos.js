import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { AntDesign } from '@expo/vector-icons';

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState([
    {
      expressao: '4 USD = 19.94 BRL',
      data: '08/09/2023',
    },
    {
      expressao: '4 USD = 19.94 BRL',
      data: '08/09/2023',
    },
    {
      expressao: '4 USD = 19.94 BRL',
      data: '08/09/2023',
    },
    {
      expressao: '4 USD = 19.94 BRL',
      data: '08/09/2023',
    },
    {
      expressao: '4 USD = 19.94 BRL',
      data: '08/09/2023',
    },
    {
      expressao: '4 USD = 19.94 BRL',
      data: '08/09/2023',
    },
  ]);

  const handleDeleteFavorito = (index) => {
    const novosFavoritos = [...favoritos];
    novosFavoritos.splice(index, 1);
    setFavoritos(novosFavoritos);
  };

  const tableHead = ['Resultados Salvos'];
  const tableData = favoritos.map((favorito, index) => {
    return [
      `${favorito.expressao}`, `${favorito.data}`,
      <TouchableOpacity
        onPress={() => handleDeleteFavorito(index)}
        style={styles.iconeExcluir}
      >
        <AntDesign name="delete" size={16} color="red" />
      </TouchableOpacity>,
    ];
  });

  return (
    <View style={styles.container}>
      <Table style={{ width: 320 }} borderStyle={{ borderWidth: 1, borderColor: '#000' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
        <Rows data={tableData} textStyle={styles.text} />
      </Table>
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
});
