import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import Login from "../Screens/Login";
import Cadastro from "../Screens/Cadastro";
import TelaConversor from "../Screens/TelaConversor";
import TelaFavoritos from "../Screens/TelaFavoritos";
import EditarPefil from "../Screens/EditarPefil";

const Tabs = () => {
    const navigation = useNavigation();

    const nav = createBottomTabNavigator();
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    const toggleLogoutModal = () => {
        setLogoutModalVisible(!isLogoutModalVisible);
    };

    const handleLogout = () => {
        navigation.navigate('Login');
        toggleLogoutModal();
    };

    return (
        <>
            <nav.Navigator screenOptions={{
                headerShown: false,
                activeTintColor: '#FFF',
                activeBackgroundColor: '#000',
                inactiveBackgroundColor: '#FFF',
                inactiveTintColor: '#000',
                labelStyle: {
                    fontSize: 30
                }
            }} initialRouteName="TelaConversor">
                <nav.Screen name="TelaConversor" component={TelaConversor}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}>
                </nav.Screen>
                <nav.Screen name="TelaFavoritos" component={TelaFavoritos}
                    options={{
                        tabBarLabel: 'Favoritos',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="book" color={color} size={size} />
                        ),
                    }}>
                </nav.Screen>
                <nav.Screen name="EditarPefil" component={EditarPefil}
                    options={{
                        tabBarLabel: 'Editar Pefil',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cog" color={color} size={size} />
                        ),
                    }}>
                </nav.Screen>
                <nav.Screen
                    name="Sair"
                    component={Login}
                    options={{
                        tabBarLabel: 'Sair',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="power-settings" color={color} size={size} />
                        ),
                    }}
                    listeners={() => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            toggleLogoutModal();
                        },
                    })}
                />
            </nav.Navigator>

            <Modal
                visible={isLogoutModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.card}>
                    <View style={styles.itensCard}>
                        <Text style={styles.texto}>Deseja realmente sair do app?</Text>
                        <View style={styles.centralizaBotoes}>
                            <TouchableOpacity style={styles.btnVoltar} onPress={toggleLogoutModal}>
                                <Text style={styles.btnTextoBotao}>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSair} onPress={handleLogout}>
                                <Text style={styles.btnTextoBotao}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default () => {
    const stack = createNativeStackNavigator();

    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name="Login" component={Login}>
            </stack.Screen>
            <stack.Screen name="Cadastro" component={Cadastro}>
            </stack.Screen>
            <stack.Screen name="Tabs" component={Tabs}>
            </stack.Screen>
        </stack.Navigator>
    )
}

const styles = StyleSheet.create({
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
    centralizaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnSair: {
        backgroundColor: '#DE2800',
        borderRadius: 5,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 10,
    },
    btnVoltar: {
        backgroundColor: '#8C8C8C',
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 10,
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
})