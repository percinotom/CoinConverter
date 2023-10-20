import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Navegacao from './src/Navigation/Navegacao';
import UserProvider from './src/Context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navegacao />
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
