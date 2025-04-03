import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useFornecedores } from '../contexto/contextoFornecedores';
import { useRouter, useLocalSearchParams } from "expo-router";
import { styles } from '@/styles/styles';
import { selecionarImagem } from '@/utils/selecaoImagem';
import { formatarTelefone } from '@/utils/formatarTelefone';

export default function EditarScreen() {
    const {fornecedores, editarFornecedor} = useFornecedores();
    const {id} = useLocalSearchParams();
    const router = useRouter();

    //Busca o fornecedor usando o ID da URL
    const fornecedor = fornecedores.find(f => f.id === Number(id));

    //Estados locais para armazenar os dados do fornecedor
    const [nome, setNome] = useState(fornecedor?.nome || '');
    const [telefone, setTelefone] = useState(fornecedor?.telefone || '');
    const [endereco, setEndereco] = useState(fornecedor?.endereco || '');
    const [categoria, setCategoria] = useState(fornecedor?.categoria || '');
    const [imagemUri, setImagemUri] = useState(fornecedor?.imagemUri || '');

    //Atualiza os estados quando o fornecedor for carregado
    useEffect(() => {
        if (fornecedor) {
            setNome(fornecedor.nome);
            setTelefone(fornecedor.telefone);
            setEndereco(fornecedor.endereco);
            setCategoria(fornecedor.categoria);
            setImagemUri(fornecedor.imagemUri);
        }
    }, [fornecedor])

    //Função para salvar as alterações no fornecedor
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

                {/* Botão para voltar à tela de início */}
                <View style={styles.containerBotaoVoltar}>
                    <TouchableOpacity 
                        style={[styles.botaoBase, styles.botaoVoltar]}
                        onPress={() => router.push('/')}>
                            <Text style={styles.textBotao}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>Editar fornecedor</Text>

                {/* Área para alterar a imagem do fornecedor */}
                <Text style={styles.text}>Imagem</Text>
                {imagemUri ? 
                    <Image source={{uri: imagemUri}} style={styles.fotoPerfil}/> : null}
                <TouchableOpacity
                    style={[styles.botaoBase, styles.botaoEditar]}
                    onPress={() => selecionarImagem(setImagemUri)}>
                            <Text style={styles.textBotao}>Nova</Text>
                </TouchableOpacity>  

                {/* Campos de entrada para editar os dados */}              
                <Text style={styles.text}>Nome</Text>
                <TextInput 
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                />
                <Text style={styles.text}>Telefone</Text>
                <TextInput 
                    style={styles.input}
                    value={telefone}
                    onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
                    keyboardType="numeric"
                />
                <Text style={styles.text}>Endereço</Text>
                <TextInput
                    style={styles.input}
                    value={endereco}
                    onChangeText={setEndereco}
                />
                <Text style={styles.text}>Categoria</Text>
                <TextInput
                    style={styles.input}
                    value={categoria}
                    onChangeText={setCategoria}
                />

                {/* Botão para salvar as edições */}
                <TouchableOpacity
                    style={[styles.botaoBase, styles.botaoPrimario]}
                    onPress={salvarEdicao}>
                        <Text style={styles.textBotao}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}