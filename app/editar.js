import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useFornecedores } from './contextoFornecedores';
import { useRouter, useLocalSearchParams } from "expo-router";
import { styles } from '../styles/styles';
import { selecionarImagem } from '../utils/selecaoImagem';

export default function EditarScreen() {
    const {fornecedores, editarFornecedor} = useFornecedores();
    const {id} = useLocalSearchParams();
    const router = useRouter();

    const fornecedor = fornecedores.find(f => f.id === Number(id));

    const [nome, setNome] = useState(fornecedor?.nome || '');
    const [telefone, setTelefone] = useState(fornecedor?.telefone || '');
    const [endereco, setEndereco] = useState(fornecedor?.endereco || '');
    const [categoria, setCategoria] = useState(fornecedor?.categoria || '');
    const [imagemUri, setImagemUri] = useState(fornecedor?.imagemUri || '');

    useEffect(() => {
        if (fornecedor) {
            setNome(fornecedor.nome);
            setTelefone(fornecedor.telefone);
            setEndereco(fornecedor.endereco);
            setCategoria(fornecedor.categoria);
            setImagemUri(fornecedor.imagemUri);
        }
    }, [fornecedor])

    const salvarEdicao = () => {
        if (!nome || !telefone || !endereco || !categoria) {
            return alert('Por favor, preencha todos os campos.');
        }

        editarFornecedor(fornecedor.id, {nome, telefone, endereco, categoria, imagemUri});

        router.push('/');
    }
    return (
        <ScrollView style={styles.containerScroll}>
            <View style={styles.container}>

                <View style={styles.containerBotaoBack}>
                    <TouchableOpacity 
                        style={[styles.botaoBase, styles.botaoVoltar]}
                        onPress={() => router.push('/')}>
                            <Text style={styles.textBotao}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>Editar fornecedor</Text>

                <Text style={styles.text}>Imagem</Text>
                {imagemUri ? 
                    <Image source={{uri: imagemUri}} style={styles.fotoPerfil}/> : null}
                <TouchableOpacity
                    style={[styles.botaoBase, styles.botaoEditar]}
                    onPress={() => selecionarImagem(setImagemUri)}>
                            <Text style={styles.textBotao}>Nova</Text>
                </TouchableOpacity>                
                <Text style={styles.text}>Nome</Text>
                <TextInput style={styles.input} value={nome} onChangeText={setNome}
                />
                <Text style={styles.text}>Telefone</Text>
                <TextInput style={styles.input} value={telefone} onChangeText={setTelefone}
                />
                <Text style={styles.text}>Endereço</Text>
                <TextInput style={styles.input} value={endereco} onChangeText={setEndereco}
                />
                <Text style={styles.text}>Categoria</Text>
                <TextInput style={styles.input} value={categoria} onChangeText={setCategoria}
                />
                <TouchableOpacity
                    style={[styles.botaoBase, styles.botaoPrimario]}
                    onPress={salvarEdicao}>
                        <Text style={styles.textBotao}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}