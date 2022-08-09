import { ButtonStyled } from './Button.styled';

export const Button = ({ onClick, children }) => (
  <ButtonStyled type="button" onClick={onClick}>
    {children}
  </ButtonStyled>
);
