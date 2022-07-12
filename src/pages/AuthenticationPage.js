import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;

  .logo {
    margin: 0 auto 20px;
  }

  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }

  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <NavLink to="/">
          <img
            srcSet="https://media.istockphoto.com/photos/vintage-cinema-sign-hanging-on-a-wall-picture-id1295372837?b=1&k=20&m=1295372837&s=170667a&w=0&h=wupm7czS3r54Hv-AUEPGFM5nbYqa6IfiDb_9S40otng= 2x"
            alt="logo"
            className="logo"
          />
        </NavLink>
        <h1 className="heading">Movie Theater UTE</h1>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
