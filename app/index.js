import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/styles";

export default function HomeSccreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text>Página Inicial</Text>
            <TouchableOpacity onPress={() => router.push('/cadastro')}>
                <Text>Cadastrar Fornecedor</Text>
            </TouchableOpacity>
        </View>
    )
}