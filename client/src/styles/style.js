import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    color: #000;
    transition: all 1.5s ease;
  }
`

export const Wrapper = styled.div`
  width: 90%;
  margin: auto;
`

export default GlobalStyle;