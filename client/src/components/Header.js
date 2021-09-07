import { Logo } from "./Logo/Logo"
import styled from "styled-components"

const HeaderContainer = styled.div`
  margin-top: 2em;
  text-align: center;

  p {
    margin-top: 10px;
    font-weight: 300;
    font-size: 1.2em;
  }
`

function Header() {
  return (
    <HeaderContainer>
      <a href='/'>
        <Logo size="250px"/>
        <p>One-click away from landing your dream job</p>
      </a>
    </HeaderContainer>
  )
}

export default Header
