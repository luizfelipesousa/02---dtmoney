import { Container, Content } from "./styles";
import logoSvg from "../../assets/logoSvg.svg";

interface HeaderProps {
  onOpenModal: () => void;
}

export function Header({ onOpenModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoSvg} alt="dtmoney" />

        <button type="button" onClick={onOpenModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
