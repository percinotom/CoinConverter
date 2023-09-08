import { Text, TextInput, Button, View, StyleSheet, Touchable, TouchableOpacity } from "react-native";

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.posicaoTextoLogo}>
                <Text style={styles.textoLogo}>CoinConverter</Text>
            </View>
            <View>
                <View>
                    <Text style={styles.texto}>Login</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setExpressao(text)}
                        placeholder="Digite o login" />
                </View>
                <View>
                    <Text style={styles.texto}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setExpressao(text)}
                        placeholder="Digite a senha" />
                </View>
                <TouchableOpacity
                    style={styles.posicaoRegistrar}
                    onPress={() => { props.navigation.navigate('Cadastro') }}>
                    <Text style={styles.registrar}>Registrar-se</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.btnEntrar}
                onPress={() => { props.navigation.navigate('Tabs') }}>
                <Text style={styles.btnTextoBotao}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
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
        color: '#17A600'
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
        position: 'absolute',
        bottom: 40
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
    }
});