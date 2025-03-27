import { View, Text, TextInput, Image, TouchableOpacity, Button, ScrollView } from "react-native";
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

        router.push('/listagem');
    }
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Editar Fornecedor</Text>
                
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
                <Text style={styles.text}>Imagem</Text>
                {imagemUri ? 
                    <Image source={{uri: imagemUri}} style={styles.fotoPerfil}/> : null}
                <TouchableOpacity onPress={() =>
                    selecionarImagem(setImagemUri)}>
                        <View>
                            <Text>Selecionar imagem</Text>
                        </View>
                </TouchableOpacity>
                <Button title="Salvar" onPress={salvarEdicao}/>
            </View>
        </ScrollView>
    )
}