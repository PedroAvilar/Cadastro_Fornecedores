import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#dff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 25,
    },
    text: {
        fontSize: 16,
    },
    input: {
        height: 40,
        width: 290,
        borderWidth: 2,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    fotoPerfil: {
        margin: 10,
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        width: 190,
        height: 40,
        backgroundColor: '#4caf4c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 6,
    }
})