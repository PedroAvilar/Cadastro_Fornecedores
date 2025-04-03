import { createContext, useContext, useState } from 'react';

//Definição da interface
interface Fornecedor {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  categoria: string;
  imagemUri: string;
}

//Interface para definir o formato do contexto
interface FornecedoresContextType {
  fornecedores: Fornecedor[];
  adicionarFornecedor: (novoFornecedor: Omit<Fornecedor, 'id'>) => void;
  editarFornecedor: (id: number, dadosAtualizados: Omit<Fornecedor, 'id'>) => void;
  excluirFornecedor: (id: number) => void;
}

//Criação do contexto com valor inicial
const FornecedoresContext = createContext<FornecedoresContextType | undefined>(undefined);


//Provedor do contexto que gerencia o estado dos fornecedores
export default function FornecedoresProvider({ children }: { children: React.ReactNode }) {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  //Função para adicionar um novo fornecedor
  const adicionarFornecedor = (novoFornecedor: Omit<Fornecedor, 'id'>) => {
    const novoId = fornecedores.length > 0 ? Math.max(...fornecedores.map(f => f.id)) + 1 : 1;
    const fornecedorComId: Fornecedor = {id: novoId, ...novoFornecedor};
    setFornecedores((prev) => [...prev, fornecedorComId]);
  }

  //Função para editar um fornecedor existente
  const editarFornecedor = (id: number, dadosAtualizados: Omit<Fornecedor, 'id'>) => {
    setFornecedores(prev =>
      prev.map(fornecedor =>
        fornecedor.id === id ? {...fornecedor, ...dadosAtualizados} : fornecedor
      )
    )
  }

  //Função para excluir um fornecedor
  const excluirFornecedor = (id: number) => {
    setFornecedores(prev =>
      prev.filter(fornecedor => fornecedor.id !== id)
    )
  }

  return (
    <FornecedoresContext.Provider value={{ fornecedores, adicionarFornecedor, editarFornecedor, excluirFornecedor }}>
      {children}
    </FornecedoresContext.Provider>
  );
}

//Hook para acessar o contexto
export function useFornecedores() {
  const context = useContext(FornecedoresContext);
  if (!context) {
    throw new Error('useFornecedores deve ser usado dentro de FornecedoresProvider');
  }
  return context;
}