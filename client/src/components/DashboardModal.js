import { useState } from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'

const OverlayContainer = styled.div`
  width: 50%;
  height: 50%;
  color: red;
  background-color: grey;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`

function DashboardModal({ activator, children}) {
  const [isOpen, setIsOpen] = useState(false)
  const content = isOpen && (
    <OverlayContainer>
      <div className='overlay'>
        <>
          <button onClick={() => setIsOpen(false)}>close</button>
        { children }
        </>
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