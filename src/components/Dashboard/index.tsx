import { Container } from "./styles";

import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionTable";
import { useDespesas } from "../../hooks/useDespesas";

export function Dashboard() {

    const despesas = useDespesas();
    console.log(despesas);

    return (
        <Container>
            <Summary />
            <TransactionTable />
        </Container>
    );
}
