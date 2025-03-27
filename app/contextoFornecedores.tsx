import { createContext, useContext, useState } from 'react';

interface Fornecedor {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  categoria: string;
  imagemUri: string;
}

interface FornecedoresContextType {
  fornecedores: Fornecedor[];
  adicionarFornecedor: (novoFornecedor: Omit<Fornecedor, 'id'>) => void;
  editarFornecedor: (id: number, dadosAtualizados: Omit<Fornecedor, 'id'>) => void;
  excluirFornecedor: (id: number) => void;
}

const FornecedoresContext = createContext<FornecedoresContextType | undefined>(undefined);

export default function FornecedoresProvider({ children }: { children: React.ReactNode }) {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  const adicionarFornecedor = (novoFornecedor: Omit<Fornecedor, 'id'>) => {
    const novoId = fornecedores.length > 0 ? Math.max(...fornecedores.map(f => f.id)) + 1 : 1;
    const fornecedorComId: Fornecedor = {id: novoId, ...novoFornecedor};
    setFornecedores((prev) => [...prev, fornecedorComId]);
  }

  const editarFornecedor = (id: number, dadosAtualizados: Omit<Fornecedor, 'id'>) => {
    setFornecedores(prev =>
      prev.map(fornecedor =>
        fornecedor.id === id ? {...fornecedor, ...dadosAtualizados} : fornecedor
      )
    )
  }

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

export function useFornecedores() {
  const context = useContext(FornecedoresContext);
  if (!context) {
    throw new Error('useFornecedores deve ser usado dentro de FornecedoresProvider');
  }
  return context;
}