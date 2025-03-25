import { styles } from "@/styles/styles";
import { View, Text, Button } from "react-native";
import { useState } from "react";
import { useFornecedores } from "./contextoFornecedores";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from 'expo-router';

export default function CadastroScreen() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');

    const {adicionarFornecedor} = useFornecedores();
    const router = useRouter();

    const salvarFornecedor = () => {
        if (!nome || !telefone || !endereco || !categoria || !imagemUrl) {
            return alert('Por favor, preencha todos os campos.');
        }

        adicionarFornecedor({nome, telefone, endereco, categoria, imagemUrl});

        setNome('');
        setTelefone('');
        setEndereco('');
        setCategoria('');
        setImagemUrl('');

        //router.push('/listagem');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Fornecedor</Text>
            <TextInput style={styles.input}
                placeholder="Nome" value={nome} onChangeText={setNome}
            />
            <TextInput style={styles.input}
                placeholder="Telefone" value={telefone} onChangeText={setTelefone}
            />
            <TextInput style={styles.input}
                placeholder="Endereço" value={endereco} onChangeText={setEndereco}
            />
            <TextInput style={styles.input}
                placeholder="Categoria" value={categoria} onChangeText={setCategoria}
            />
            <TextInput style={styles.input}
                placeholder="URL da imagem" value={imagemUrl} onChangeText={setImagemUrl}
            />
            <Button title="Cadastrar" onPress={salvarFornecedor}/>
        </View>
    )
}