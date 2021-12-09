import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface DespesasContextProps {
  children: ReactNode;
}

interface DespesasContextValueProps {
  despesas: DespesasProps[];
  createNewDespesa: (despesa: DespesaData) => Promise<void>;
}

interface DespesasProps {
  id: string;
  title: string;
  value: number;
  category: string;
  type: string;
  datetime: number;
}

type DespesaData = Omit<DespesasProps, "id">;

const DespesasContext = createContext<DespesasContextValueProps>({} as DespesasContextValueProps);

export function DespesasContextProvider({ children }: DespesasContextProps) {
  const [despesas, setDespesas] = useState<DespesasProps[]>([]);

  useEffect(() => {
    api.get("despesas").then((response) => {
      setDespesas(response.data.despesas);
    });
  }, []);

  async function createNewDespesa(despesaData: DespesaData){
    const response = await api.post("transaction", despesaData);
    const {despesa} = response.data;
    setDespesas([...despesas, despesa]);
  }

  return (
    <DespesasContext.Provider value={{ despesas, createNewDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}

export function useDespesas(){
    const despesas = useContext(DespesasContext);
    return despesas;
}