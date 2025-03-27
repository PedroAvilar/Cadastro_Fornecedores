import { styles } from "@/styles/styles";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useFornecedores } from "./contextoFornecedores";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from 'expo-router';
import { selecionarImagem } from '@/utils/selecaoImagem';

export default function CadastroScreen() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagemUri, setImagemUri] = useState('');

    const {adicionarFornecedor} = useFornecedores();
    const router = useRouter();

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

        router.push('/listagem');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Fornecedor</Text>

            <Text style={styles.text}>Nome</Text>
            <TextInput style={styles.input}
                placeholder="João Silva Santos" value={nome} onChangeText={setNome}
            />
            <Text style={styles.text}>Telefone</Text>
            <TextInput style={styles.input}
                placeholder="(11)93344-2211" value={telefone} onChangeText={setTelefone}
            />
            <Text style={styles.text}>Endereço</Text>
            <TextInput style={styles.input}
                placeholder="Rua Braga Filho, 53" value={endereco} onChangeText={setEndereco}
            />
            <Text style={styles.text}>Categoria</Text>
            <TextInput style={styles.input}
                placeholder="Eletrônicos" value={categoria} onChangeText={setCategoria}
            />
            <Text style={styles.text}>Imagem</Text>
            <TouchableOpacity onPress={() => selecionarImagem(setImagemUri)}>
                {imagemUri ? (
                    <Image source={{uri: imagemUri}}/>
                ) : (
                    <View>
                        <Text>Selecionar imagem</Text>
                    </View>
                )}
            </TouchableOpacity>
            <Button title="Cadastrar" onPress={salvarFornecedor}/>
        </View>
    )
}