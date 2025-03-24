import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/styles";

export default function HomeSccreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text>Página Inicial</Text>
            <Button title="Cadastro" onPress={() => router.push('/cadastro')}/>
        </View>
    )
}