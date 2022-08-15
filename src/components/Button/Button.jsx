import PropTypes from 'prop-types';

import { ButtonStyled } from './Button.styled';

export const Button = ({ onClick, children }) => (
  <ButtonStyled type="button" onClick={onClick}>
    {children}
  </ButtonStyled>
);
Button.propTypes = {
  onClick: PropTypes.func,
};
