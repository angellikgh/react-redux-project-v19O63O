import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    background-image: url(./background.png);
    background-position-x: center;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .navbar {
    height: 100px;
  }

  .navbar-brand,
  .navbar-link {
    color: #FFFFFF !important;
  }

  .signup-panel,
  .login-panel {
    border-radius: 6px;    
    margin: 0 auto;
    width: 456px;
    margin-top: 80px;
  }

  .signup-panel form,
  .login-panel form {
    background-color: #FFFFFF;
    border-radius: 6px;    
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 100px 30px 0px 30px;
    width: 456px;
  }

  .signup-panel form {
    height: 546px;
  }
  .login-panel form {
    height: 476;
  }

  .signup-panel span,
  .login-panel .title {
    box-shadow: 1px 15px 20px 1px #bebebe;
    background: linear-gradient(90deg,#ab47bc,#7c1fa2);
    border-radius: 4px;
    color: #FFFFFF;
    height: 80px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin: 0px 17px -40px 17px;
    padding-top: 32px;
    padding-bottom: 28px;
    display: inline-block;
    width: -webkit-fill-available;
  }
  .signup-panel .form-group,
  .login-panel .form-group {
    justify-content: center;
    flex-grow: 4;
    align-item: baseline;
  }

  .signup-panel .form-group input,
  .login-panel .form-group input {
    margin-top: 30px;
    border: none;    
    border-bottom: 1px solid #aaaaaa;
    border-radius: 0;
  }

  .signup-panel .form-group input:focus,
  .login-panel .form-group input:focus {
    box-shadow: none;
    border-bottom: 3px solid #aaaaaa;
  }

  .signup-panel .form-footer,
  .login-panel .form-footer {
    text-align: center;
    flex-grow: 2;
  }

  .user-list {
    
  }

  .btn-primary {
    background-color: #9c27b0;
    border: none !important;
    color: #FFFFFF;
    font-size: 16px;
    padding: 12px 40px;
  }
`;

export default GlobalStyle;
