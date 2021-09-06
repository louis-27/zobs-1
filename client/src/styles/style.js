import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    color: #000;
    transition: all 0.5s ease;
    background-color: #E0E5EC;
  }
`

export const Wrapper = styled.div`
  width: 90%;
  margin: auto;
  /* background-color: #E0E5EC; */
`

export default GlobalStyle;