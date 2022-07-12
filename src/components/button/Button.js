import React from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../loading";
import PropTypes from "prop-types";

/**
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns
 *
 */

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  background-image: linear-gradient(to right bottom, #00a784, #a4d96c);
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  height: ${(props) => props.height || "66px"};
  display: flex;
  justify-content: center;
  align-items: center;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <div>
      <ButtonStyles type={type} onClick={onClick} {...props}>
        {child}
      </ButtonStyles>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
