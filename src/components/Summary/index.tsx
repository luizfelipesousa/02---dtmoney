import { Container, Retiradas } from "./styles";

import Entradas from "../../assets/Entradas.svg";
import Saidas from "../../assets/Saidas.svg";
import Total from "../../assets/Total.svg";
import { useDespesas } from "../../hooks/useDespesas";

export function Summary() {
  const { despesas } = useDespesas();
  const resumo = despesas.reduce(
    (acc, despesa) => {
      if (despesa.type === "deposit") {
        acc.entradas += despesa.value;
        acc.total += despesa.value;
      } else {
        acc.retiradas += despesa.value;
        acc.total -= despesa.value;
      }

      return acc;
    },
    {
      entradas: 0,
      retiradas: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={Entradas} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(resumo.entradas)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={Saidas} alt="Saídas" />
        </header>
        <Retiradas>
         -{new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(resumo.retiradas)}
        </Retiradas>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={Total} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(resumo.total)}
        </strong>
      </div>
    </Container>
  );
}
