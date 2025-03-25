import { View, Text, FlatList, Image } from "react-native";
import { useFornecedores } from "./contextoFornecedores";
import { styles } from "../styles/styles";

export default function ListagemScreen() {
    const {fornecedores} = useFornecedores();
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Fornecedores</Text>

            {fornecedores.length === 0 ? (
                <Text style={styles.text}>Nenhum fornecedor cadastrado.</Text>
            ) : (
                <FlatList
                    data={fornecedores}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View>
                            <Image source={{uri: item.imagemUrl}}/>
                            <View>
                                <Text>{item.nome}</Text>
                                <Text>📞 {item.telefone}</Text>
                                <Text>📍 {item.endereco}</Text>
                                <Text>📦 {item.categoria}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    )
}