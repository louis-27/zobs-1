import { FaLink, FaTag, FaUser, FaTrash } from 'react-icons/fa'
import { HiArrowNarrowRight } from 'react-icons/hi'
import styled from 'styled-components'
import axios from 'axios'

export function Post({ name, tag, uri, applicants }) {
  const colors = {
    "Business": "#16A34A",
    "Design": "#EA580C",
    "Tech": "#0169FF"
  };
  
  const textColor = colors[tag];

  return (
    <Card type={ textColor }>
      <h1>{ name }</h1>
      <div>
        <FaLink /> <span className="underline"><a href={ '/talent/' + uri }>{ '/talent/' + uri }</a></span>
        {/* <a href={'/talent/' + uri}>click this link</a> */}
      </div>
      <div>
        <FaTag /> <span>{ tag.charAt(0).toUpperCase() + tag.slice(1) }</span>
      </div>
      <div>
        <FaUser /> <span>Applicants: { applicants }</span>
      </div>

      <FaTrash id='trash' onClick={ () => {
        const jwt = localStorage.getItem('jwt-token')
        axios.delete('/jobpost/' + uri, {headers: {'x-access-token': jwt}})
          .then(res => {
            console.log('deleted item', res)
            window.location.reload()
          })
          .catch(res => {
            console.log('can not delete item', res)
            window.location.reload()
          })
      } }/>

      <ResultsButton type={ textColor }>
        <a href={'/results/' + uri}>
          See Results <HiArrowNarrowRight />
        </a>
      </ResultsButton>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  background-color: #E0E5EC;

  padding: 20px 15px;
  border-radius: 20px;
  box-shadow: inset 6px 6px 12px #A3B1C6,
              inset -6px -6px 12px #F6F7F9;

  transition: all 0.2s ease;
  :hover {
    box-shadow: 8px 8px 18px 0 #A3B1C6, -8px -8px 18px 0  #F6F7F9;
    h1 {color: ${props => props.type};}
  }

  *:hover {
    cursor: default;
  }

  .underline, a {
    :hover {
      cursor: pointer;
    }
  }

  #trash {
    position: absolute;
    top: 20px;
    right: 15px;
  }

  #trash:hover {
    cursor: pointer;
  }
  
`

const ResultsButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 15px;

  display: flex;
  align-items: center;

  :hover {
    /* text-decoration: underline; */
    border-bottom: 1px solid ${props => props.type};
    cursor: pointer;
  }

  svg {
    margin-left: 2px;
  }
`
