import { createServer, Model } from "miragejs";
import { useDespesas } from "../../hooks/useDespesas";
import { Container } from "./styles";

createServer({
  models: {
    despesa: Model,
  },

  seeds(server) {
    server.db.loadData({
      despesas: [
        {
          id: "1",
          title: "Moto",
          value: 1000,
          category: "despesa",
          type: "withdraw",
          datetime: new Date().getTime(),
        },
        {
          id: "2",
          title: "Cachorro",
          value: 200,
          category: "Petshop",
          type: "withdraw",
          datetime: new Date().getTime(),
        },
        {
          id: "3",
          title: "Casa",
          value: 1000,
          category: "Aluguel",
          type: "withdraw",
          datetime: new Date().getTime(),
        },
        {
          id: "4",
          title: "Cabelereiro",
          value: 50,
          category: "Cuidados",
          type: "withdraw",
          datetime: new Date().getTime(),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/despesas", () => {
      const data = this.schema.all("despesa");
      console.log(data);
      return data;
    });

    this.post("/transaction", (schema, request) => {
      const newDespesa = JSON.parse(request.requestBody);
      return schema.create("despesa", newDespesa);
    });
  },
});

export function TransactionTable() {
  const { despesas } = useDespesas();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {despesas.map((despesa) => {
            return (
              <tr key={despesa.id}>
                <td>{despesa.title}</td>
                <td className={despesa.type}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(despesa.value)}
                </td>
                <td>{despesa.category}</td>
                <td>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(despesa.datetime)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
