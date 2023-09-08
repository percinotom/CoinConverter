import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login";
import Cadastro from "../Screens/Cadastro";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TelaConversor from "../Screens/TelaConversor";
import TelaFavoritos from "../Screens/TelaFavoritos";
import EditarPefil from "../Screens/EditarPefil";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tabs = () => {
    const nav = createBottomTabNavigator();

    return (
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
                    tabBarLabel: 'TelaFavoritos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="book" color={color} size={size} />
                    ),
                }}>
            </nav.Screen>
            <nav.Screen name="EditarPefil" component={EditarPefil}
                options={{
                    tabBarLabel: 'Editar Pefil',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chat" color={color} size={size} />
                    ),
                }}>
            </nav.Screen>
        </nav.Navigator>
    )
}

export default () => {
    const stack = createNativeStackNavigator();

    return (
        <stack.Navigator screenOptions={{headerShown:false}}>
            <stack.Screen name="Login" component={Login}>
            </stack.Screen>
            <stack.Screen name="Cadastro" component={Cadastro}>
            </stack.Screen>
            <stack.Screen name="Tabs" component={Tabs}>
            </stack.Screen>
        </stack.Navigator>
    )
}