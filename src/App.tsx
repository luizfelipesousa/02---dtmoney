import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { useState } from "react";
import { TransactionModal } from "./components/TransactionModal";
import { DespesasContextProvider } from "./hooks/useDespesas";

export function App() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionOpen(false);
  }

  return (
    <DespesasContextProvider>
      <GlobalStyle />

      <Header onOpenModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <TransactionModal
        isModalOpen={isNewTransactionOpen}
        requestClose={handleCloseNewTransactionModal}
      />
    </DespesasContextProvider>
  );
}
