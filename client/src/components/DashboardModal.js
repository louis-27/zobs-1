import { useState } from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons';

const OverlayContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #E0E5EC;
  position:fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);

  button{
    position: absolute;
    right: 2%;
    top: 2%;
    color: #222;
    background-color: #E0E5EC;
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 6px 6px 12px 0 #A3B1C6, -6px -6px 12px 0  #F6F7F9;
    
    :hover {
      color: #FF4500;
    }

    :active{
      box-shadow: inset 3px 3px 8px #A3B1C6,
                    inset -3px -3px 8px #F6F7F9;
      transition: all 0.2s ease;
    } 
  }

  .form-container{
    width: 50%;
    height: 50%;
    border-radius: 20px;
    padding: 25px 20px;

    position: absolute;
    top: 20%;
    left: 25%;

    box-shadow: 6px 6px 12px 0 #A3B1C6, -6px -6px 12px 0  #F6F7F9;
  }

  h1, .input-form, .title-form{
    margin-left: 10px;
  }

  h1, .title-form {
    color: black;
  }

  h1{
    font-size: 30px;
    font-weight: 500;
  }

  .title-form{
    font-weight: 500;
    margin-bottom: 0px;
    margin-top: 10px;
  }

  #text-input {
    background-color: #E0E5EC;
    border: none;
    border-radius: 5px;
    box-shadow: inset 3px 3px 6px #A3B1C6,
                inset -3px -3px 6px #F6F7F9;
  }
`

function DashboardModal({ activator, children}) {
  const [isOpen, setIsOpen] = useState(false)
  const content = isOpen && (
    <OverlayContainer>
      <div className='overlay'>
        <div className='form-container'>
          <button onClick={() => setIsOpen(false)}><CloseOutlined /></button>
          { children }
        </div>
      </div>
    </OverlayContainer>
  )
  return (
    <>
      {activator({ setIsOpen })}
      {ReactDom.createPortal(content, document.getElementById('overlay'))}
    </>
  )
}

export default DashboardModal
