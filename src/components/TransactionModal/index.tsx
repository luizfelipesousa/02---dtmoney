import Modal from "react-modal";

import { Container, TransactionTypeContainer, RadioButton } from "./styles";

import BotaoFechar from "../../assets/BotaoFechar.svg";
import Entrada from "../../assets/Entradas.svg";
import Saida from "../../assets/Saidas.svg";
import React, { useEffect, useState } from "react";
import { useDespesas } from "../../hooks/useDespesas";

interface TransactionModalProps {
  isModalOpen: boolean;
  requestClose: () => void;
}

Modal.setAppElement("#root");

export function TransactionModal({
  isModalOpen,
  requestClose,
}: TransactionModalProps) {
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");

  const { createNewDespesa } = useDespesas();

  useEffect(() => {
    setType("deposit");
    setTitle("");
    setValue(0);
    setCategory("");
  }, [isModalOpen]);

  async function handleCreateNewTransaction(event: React.FormEvent) {
    event.preventDefault();

    const datetime = new Date().getTime();

    await createNewDespesa({
      title,
      value,
      category,
      type,
      datetime,
    });

    requestClose();
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={requestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={(event) => handleCreateNewTransaction(event)}>
        <h2>Cadastrar nova transação</h2>

        <button
          className="react-modal-close"
          type="button"
          onClick={requestClose}
        >
          <img src={BotaoFechar} alt="Fechar modal" />
        </button>

        <input
          placeholder="Titulo"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioButton
            type="button"
            isActive={type === "deposit"}
            activeColor={"green"}
            onClick={() => setType("deposit")}
          >
            <img src={Entrada} alt="Entrada" />
            <span>Entrada</span>
          </RadioButton>
          <RadioButton
            type="button"
            isActive={type === "withdraw"}
            activeColor={"red"}
            onClick={() => setType("withdraw")}
          >
            <img src={Saida} alt="Entrada" />
            <span>Saída</span>
          </RadioButton>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
