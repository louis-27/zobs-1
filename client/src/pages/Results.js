import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Button, Select, Input, Radio, Menu, Dropdown, Form } from 'antd'

import { Wrapper } from '../styles/style'
import Header from '../components/Header'
import { HiUserCircle, HiArrowRight } from 'react-icons/hi'
import { Logo } from '../components/Logo/Logo'

const { SubMenu } = Menu;

function Results({ match }) {
  const [jobPosts, setJobPosts] = useState([])
  const [results, setResults] = useState([])
  const [isRanked, setIsRanked] = useState(false)

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
        const len = res.data.results.length
        const screened = Math.floor(len / 10)
        const minLen = len > 15 ? 15 : len
        setResults(res.data.results.slice(0, minLen))
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
        <Menu
            style={{ width: 256 }}
            mode="inline"
          >
          <SubMenu id="dropdown-admin" style={{position: 'absolute'}, {fontSize: "20px"}}key="sub1" icon={<HiUserCircle/>} title="Admin">
            <Menu.Item
              id="dropdown-logout"
              style={{ width: '100%' }, {position: 'absolute'}}
              key="1"
              onClick={() => localStorage.removeItem('jwt-token')}
            >
              <a href="../login">Log out</a>
            </Menu.Item>
          </SubMenu>
          </Menu>
        </div>
      </HeaderContainer>
      <ResultScreenedContainer>
        { jobPosts.map((e, i) => {
          console.log(results)
          if (e.uri === match.params.id) return <h1 key={i}>{ e.title }</h1>
          return null
        }) }
        <Radio.Group defaultValue='a' size='large' onChange={ () => setIsRanked(!isRanked) }>
          <Radio.Button className='radio-selector' value='a'>Screened</Radio.Button>
          <Radio.Button className='radio-selector' value='b'>Ranked</Radio.Button>
        </Radio.Group>

        <div id="post-container">
          { isRanked 
            ? [...results].sort((a, b) => b.score > a.score).map((val, i) => (
                <ResultPost k={i} name={val.name} email={val.email} filehash={val.filehash} rank={i}/>
              ))
            : results.map((val, i) => (
                <ResultPost k={i} name={val.name} email={val.email} filehash={val.filehash}/>
              ))
          }
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

function ResultPost({ k, name, email, filehash, rank }) {
  return (
    <div className="screened__posts" key={k}>
      <div style={{display: 'flex'}}>
        {rank != null ? <h1 style={{marginRight: '10px'}}>#{rank}</h1> : null}
        <div className="screened__posts2">
          <p id="name-post"> {name}</p>
          <p id="email-post"> {email}</p>
        </div>
      </div>
      <div id='view-file'
        onClick={ () => {
          const jwt = localStorage.getItem('jwt-token')
          axios.get('/uploads/' + filehash, {
            responseType: 'blob',
            headers: {
              'x-access-token': jwt,
              Accept: 'application/octet-stream',
            },
          })
            .then(res => {
              const bob = res.data
              const link = document.createElement('a')
              link.href = window.URL.createObjectURL(bob)
              link.download = 'resume.pdf'
              link.click()
            })
            .catch(err => console.log('unable to get file', err))
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <HiArrowRight/>View CV
        </div>
      </div>
    </div>
  )
}

const ResultScreenedContainer = styled.div`
  margin-bottom: 5%;
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
  
  .radio-selector {
    background-color: #E0E5EC;
    margin: 20px 20px 20px 0px;
    box-shadow: 6px 6px 12px 0 #A3B1C6, -6px -6px 12px 0  #F6F7F9;
    border: none;
  }

  #view-file:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .ant-radio-button-wrapper {
    border-radius: 20px;
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before{
    display: none;
  }

  .ant-radio-button-wrapper:not(:first-child)::before{
    display: none;
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
    background-color: #E0E5EC;

    svg {
      font-size: 1.5em;
    }
    
    animation: none;

    ul{
      background-color: #E0E5EC;
      border: none;

      li{
        border-radius: 20px;
        background-color: #E0E5EC;
        box-shadow: 6px 6px 12px 0 #A3B1C6, -6px -6px 12px 0  #F6F7F9;
        width: 250px;
      }
    }
  }
`

export default Results
