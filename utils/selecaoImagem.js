import * as ImagePicker from 'expo-image-picker';


export async function selecionarImagem(setImagemUri) {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Necessário permissão para acessar a galeria.');
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    })
    if (!result.canceled) {
        setImagemUri(result.assets[0].uri || '')
    }
}