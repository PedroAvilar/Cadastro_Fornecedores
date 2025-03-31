import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scrollContainer: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#ede',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    containerButtonEdit: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    containerButtonBack: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 25,
        color: '#000',
    },
    text: {
        fontSize: 16,
        color: '#000',
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
    buttonBase: {
        height: 40,
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
    },
    buttonPrimary: {
        width: 190,
        backgroundColor: '#3a3',
    },
    buttonBack: {
        backgroundColor: '#888',
        width: 100,
    },
    buttonEdit: {
        backgroundColor: '#35f',
        width: 100,
    },
    buttonDel: {
        backgroundColor: '#f33',
        width: 100,
    },

})