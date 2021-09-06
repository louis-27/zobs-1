import { PropertySafetyFilled } from '@ant-design/icons';
import { FaLink, FaTag, FaUser } from 'react-icons/fa'
import { HiArrowNarrowRight } from 'react-icons/hi'
import styled from 'styled-components'

export function Post({ name, tag, uri, applicants }) {
  const colors = {
    "Business": "#16A34A",
    "Design": "#EA580C",
    "Tech": "#E11D48"
  };

  const bgColor = colors[tag];
  console.log()

  return (
    <Card type={ bgColor }>
      <h1>{ name }</h1>
      <div>
        <FaLink /> <span className="underline">{ uri }</span>
        <a href={'/talent/' + uri}>click this link</a>
      </div>
      <div>
        <FaTag /> <span>{ tag }</span>
      </div>
      <div>
        <FaUser /> <span>Applicants: { applicants }</span>
      </div>

      <ResultsButton>
        See Results <HiArrowNarrowRight />
      </ResultsButton>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  color: white;
  background-color: #0169FF;
  background-color: ${props => props.bgColor};

  /* width: 100%; */
  padding: 20px 15px;
  border-radius: 20px;

  transition: all 0.2s ease;
  :hover {
    transform: scale(1.05);
  }

  h1 {
    color: white;
  }

  .underline {
    cursor: pointer;

    :hover {
      text-decoration: underline;
    }
  }
`

const ResultsButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 15px;

  cursor: pointer;

  display: flex;
  align-items: center;

  :hover {
    /* text-decoration: underline; */
    border-bottom: 1px solid white;
  }

  svg {
    margin-left: 2px;
  }
`
