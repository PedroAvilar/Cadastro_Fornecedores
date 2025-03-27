import { View, Text, FlatList, Image, TextInput, Alert, TouchableOpacity, Platform } from "react-native";
import { useFornecedores } from "./contextoFornecedores";
import { styles } from "../styles/styles";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ListagemScreen() {
    const {fornecedores, excluirFornecedor} = useFornecedores();
    const [filtro, setFiltro] = useState('');
    const router = useRouter();

    const fornecedoresFiltrados = fornecedores.filter(fornecedor => (
        fornecedor.nome.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
        fornecedor.telefone.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
        fornecedor.endereco.toLowerCase().includes(filtro.toLowerCase()) ||
        fornecedor.categoria.toLowerCase().includes(filtro.toLowerCase())
    ))

    const confirmarExclusao = (id) => {
        if (Platform.OS === 'web') {
            const confirmacao = window.confirm("Tem certeza que deseja excluir?");
            if (confirmacao) {
                excluirFornecedor(id);
            }
        } else {
            Alert.alert(
                "Excluir Fornecedor",
                "Tem certeza que deseja excluir?",
                [
                    {text: "Cancelar", style: 'cancel'},
                    {text: "Excluir", onPress: () => excluirFornecedor(id), style: 'destructive'}
                ]
            )
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Lista de fornecedores</Text>

            <View>
                <Text>Buscar fornecedor</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome, telefone, categoria ou localização"
                    value={filtro}
                    onChangeText={setFiltro}
                />
            </View>


            {fornecedoresFiltrados.length === 0 ? (
                <Text style={styles.text}>Nenhum fornecedor encontrado.</Text>
            ) : (
                <FlatList
                    data={fornecedoresFiltrados}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View>
                            <Image source={{uri: item.imagemUri}} style={styles.fotoPerfil}/>
                            <View>
                                <Text>{item.nome}</Text>
                                <Text>📞 {item.telefone}</Text>
                                <Text>📍 {item.endereco}</Text>
                                <Text>📦 {item.categoria}</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() =>
                                    router.push(`/editar?id=${item.id}`)}>
                                        <Text>✏️ Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>
                                    confirmarExclusao(item.id)}>
                                        <Text>❌ Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    )
}