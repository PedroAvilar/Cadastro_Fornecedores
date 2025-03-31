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
        <View style={styles.containerScroll}>
            <View style={styles.container}>
                <Text style={styles.title}>Lista de fornecedores</Text>

                <TouchableOpacity
                    style={[styles.botaoBase, styles.botaoPrimario]}
                    onPress={() => router.push('/cadastro')}>
                        <Text style={styles.textBotao}>Adicionar</Text>
                </TouchableOpacity>

                <View>
                    <Text style={styles.text}>Buscar</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome, telefone, categoria ou localização"
                        value={filtro}
                        onChangeText={setFiltro}
                    />
                </View>


                {fornecedoresFiltrados.length === 0 ? (
                    <Text style={[styles.text, {padding: 30}]}>Nenhum fornecedor encontrado.</Text>
                ) : (
                    <FlatList
                        style={{width: '100%'}}
                        data={fornecedoresFiltrados}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.container}>
                                <Image source={{uri: item.imagemUri}} style={styles.fotoPerfil}/>
                                <View>
                                    <Text style={styles.textNome}>👤 {item.nome}</Text>
                                    <Text style={styles.text}>📞 {item.telefone}</Text>
                                    <Text style={styles.text}>📍 {item.endereco}</Text>
                                    <Text style={styles.text}>📦 {item.categoria}</Text>
                                </View>
                                <View style={styles.containerBotaoEditar}>
                                    <TouchableOpacity 
                                        style={[styles.botaoBase, styles.botaoEditar]}
                                        onPress={() => router.push(`/editar?id=${item.id}`)}>
                                            <Text style={styles.textBotao}>Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.botaoBase, styles.botaoExcluir]}
                                        onPress={() => confirmarExclusao(item.id)}>
                                            <Text style={styles.textBotao}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
        </View>
    )
}