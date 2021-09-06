import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Wrapper } from '../styles/style'
import Header from '../components/Header'
import { HiUserCircle, HiArrowRight } from 'react-icons/hi'
import { Logo } from '../components/Logo/Logo'

function Results({ match }) {
  const [jobPosts, setJobPosts] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt-token')
    axios.get('/jobpost', {headers: {'x-access-token': jwt}})
      .then(res => {
        console.log('should get data here', res.data)
        setJobPosts(res.data.job_posts)
      })
      .catch(err => {
        console.log('unable to fetch data', err)
      })
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt-token')
    axios.get(`/results/${match.params.id}`, {headers: {'x-access-token': jwt}})
      .then(res => {
        console.log('should get data here', res.data)
        setResults(res.data.results)
      })
      .catch(err => {
        console.log('unable to fetch data', err)
      })
  }, [jobPosts, match.params.id])

  const isValidId = () => jobPosts.some(i => i.uri === match.params.id)

  const resultsList = (
    <>
    <Wrapper>
      <HeaderContainer>
        <Logo size="150px"/>
        <div className="user-profile">
          <HiUserCircle />
          <span>Admin</span>
        </div>
      </HeaderContainer>
      <ResultScreenedContainer>
        <h1>&#60;jobtitle&#62;</h1>
        <div id="post-container">
          {results.map((val, i) => (
            <div className="screened__posts" key={i}>
              <div className="screened__posts2">
                <p id="name-post"> {val.name}</p>
                <p id="email-post"> {val.email}</p>
              </div>
              <div>
                <HiArrowRight
                  onClick={ () => {
                    const jwt = localStorage.getItem('jwt-token')
                    console.log('WOIE')
                    axios.get(`/uploads/${val.filehash}`, {headers: {'x-access-token': jwt}})
                      .then(res => console.log('got file', res))
                      .catch(err => console.log('unable to get file', err))
                  }}
                />View CV
              </div>
            </div>
          ))}
        </div>
      </ResultScreenedContainer>
    </Wrapper>
    </>
  )

  return (
    <>
    {isValidId() ? resultsList : <>404 not found</>}
    </>
  )
}

const ResultScreenedContainer = styled.div`

  #post-container{
    padding-top: 15px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
    position: relative;
    background-color: #E0E5EC;
  }

  #name-post{
    font-size: 1.7em;
    font-weight: bold;
  }

  #email-post{
    text-decoration: underline;
  }

  .screened__posts{
    padding: 20px 15px;
    border-radius: 20px;
    box-shadow: inset 6px 6px 12px #A3B1C6,
                inset -6px -6px 12px #F6F7F9;
    display: flex;
    justify-content: space-between;

    :hover{
      box-shadow: 8px 8px 18px 0 #A3B1C6, -8px -8px 18px 0  #F6F7F9;
    }
  }

`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 25px;
  margin-bottom: 50px;

  .user-profile {
    display: flex;
    align-items: center;
    font-size: 1.6em;

    svg {
      font-size: 1.5em;
    }
  }
`

export default Results