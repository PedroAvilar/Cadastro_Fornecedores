export const formatarTelefone = (numero) => {

    //Permite apenas números e limita 11 dígitos
    let numeroFormatado = numero.replace(/\D/g, '').slice(0, 11);

    //Formatação para número de celular - 11 dígitos
    if (numeroFormatado.length === 11) {
        return `(${numeroFormatado.slice(0, 2)}) ${numeroFormatado.slice(2, 7)}-${numeroFormatado.slice(7)}`;
    } 
    //Formatação para telefone fixo - 10 dígitos
    else if (numeroFormatado.length === 10) {
        return `(${numeroFormatado.slice(0, 2)}) ${numeroFormatado.slice(2, 6)}-${numeroFormatado.slice(6)}`;
    } 
    //Formatação inicial para o DDD
    else if (numeroFormatado.length >= 3) {
        return `(${numeroFormatado.slice(0, 2)}) ${numeroFormatado.slice(2)}`;
    }

    return numeroFormatado;
}