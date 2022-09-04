// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 16px;
        text-align: left;
        background-color: white;
        min-height:100vh;
    }
    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }
    p {
        margin: 0;
    }
    a {
        text-decoration: none;
    }

    ol,ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }

`;

export default GlobalStyle;
