import { createContext, useContext, useState } from 'react';

interface Fornecedor {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  categoria: string;
  imagemUrl: string;
}

interface FornecedoresContextType {
  fornecedores: Fornecedor[];
  adicionarFornecedor: (novoFornecedor: Omit<Fornecedor, 'id'>) => void;
}

const FornecedoresContext = createContext<FornecedoresContextType | undefined>(undefined);

export function FornecedoresProvider({ children }: { children: React.ReactNode }) {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  const adicionarFornecedor = (novoFornecedor: Omit<Fornecedor, 'id'>) => {
    const id = fornecedores.length > 0 ? fornecedores[fornecedores.length - 1].id + 1 : 1;

    const fornecedorComId: Fornecedor = { id, ...novoFornecedor };
    setFornecedores((prev) => [...prev, fornecedorComId]);
  };

  return (
    <FornecedoresContext.Provider value={{ fornecedores, adicionarFornecedor }}>
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