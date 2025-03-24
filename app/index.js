import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeSccreen() {
    const router = useRouter();
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <Text>Página Inicial</Text>
            <Button title="Cadastro" onPress={() => router.push('/cadastro')}/>
        </View>
    )
}