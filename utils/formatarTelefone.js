export const formatarTelefone = (numero) => {
    let numeroFormatado = numero.replace(/\D/g, '').slice(0, 11);

    if (numeroFormatado.length === 11) {
        return `(${numeroFormatado.slice(0, 2)}) ${numeroFormatado.slice(2, 7)}-${numeroFormatado.slice(7)}`;
    } else if (numeroFormatado.length === 10) {
        return `(${numeroFormatado.slice(0, 2)}) ${numeroFormatado.slice(2, 6)}-${numeroFormatado.slice(6)}`;
    } else if (numeroFormatado.length >= 3) {
        return `(${numeroFormatado.slice(0, 2)}) ${numeroFormatado.slice(2)}`;
    }

    return numeroFormatado;
}