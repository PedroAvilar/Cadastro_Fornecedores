import { styles } from "@/styles/styles";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { useFornecedores } from "./contexto/contextoFornecedores";
import { useRouter } from 'expo-router';
import { selecionarImagem } from '@/utils/selecaoImagem';
import { formatarTelefone } from '@/utils/formatarTelefone';

export default function CadastroScreen() {
    //Estados locais para armazenar os dados do novo fornecedor
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagemUri, setImagemUri] = useState('');

    const {adicionarFornecedor} = useFornecedores();
    const router = useRouter();

    //Função para salvar o novo fornecedor
    const salvarFornecedor = () => {
        if (!nome || !telefone || !endereco || !categoria) {
            return alert('Por favor, preencha todos os campos.');
        }

        adicionarFornecedor({nome, telefone, endereco, categoria, imagemUri});

        setNome('');
        setTelefone('');
        setEndereco('');
        setCategoria('');
        setImagemUri('');

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

                <Text style={styles.title}>Cadastro de fornecedor</Text>

                {/* Área para inserir a imagem do fornecedor */}
                <Text style={styles.text}>Imagem</Text>
                {imagemUri ? 
                    <Image source={{uri: imagemUri}} style={styles.fotoPerfil}/> : null}
                <TouchableOpacity
                    style={[styles.botaoBase, styles.botaoEditar]}
                    onPress={() => selecionarImagem(setImagemUri)}>
                            <Text style={styles.textBotao}>Nova</Text>
                </TouchableOpacity>

                {/* Campos de entrada do formulário */}
                <Text style={styles.text}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Pedro Wilson Araújo Avilar"
                    value={nome} onChangeText={setNome}
                />
                <Text style={styles.text}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(11)94433-2211"
                    value={telefone}
                    onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
                    keyboardType="numeric"
                />
                <Text style={styles.text}>Endereço</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rua Arlindo Braga, 53, Guarulhos - SP"
                    value={endereco}
                    onChangeText={setEndereco}
                />
                <Text style={styles.text}>Categoria</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Eletrodomésticos"
                    value={categoria}
                    onChangeText={setCategoria}
                />

                {/* Botão para cadastrar o fornecedor */}
                <TouchableOpacity
                    style={[styles.botaoBase, styles.botaoPrimario]}
                    onPress={salvarFornecedor}>
                        <Text style={styles.textBotao}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}