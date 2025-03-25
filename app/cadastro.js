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
            <Text style={styles.text}>URL da imagem</Text>
            <TextInput style={styles.input}
                placeholder="https://imagem.perfil" value={imagemUrl} onChangeText={setImagemUrl}
            />
            <Button title="Cadastrar" onPress={salvarFornecedor}/>
        </View>
    )
}