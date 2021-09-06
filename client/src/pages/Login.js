import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd';
import axios from 'axios'

import styled from 'styled-components'
import Header from '../components/Header';

const FormContainer = styled.div`
  padding: 8% 20% 8% 20%;
  background-color: #E0E5EC;
  width: 100%; 
  height: 100vh;

  form{
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .input-box{
      display: flex;
      flex-direction: column;
      width: 40%;
      margin-bottom: 20px;

      label{
        font-weight: 600;
        font-size: 1.2em;
        margin-bottom: 8px;
      }
      
      input{
        border-radius: 5px; 
        padding: 5px 10px;
        border: none;
        background-color: #E0E5EC;

        box-shadow: 3px 3px 8px 0 #A3B1C6 inset, -3px -3px 8px 0  #F6F7F9 inset;
        color: #808080;
      }

      input:focus {
          outline: none;
      }
      input::placeholder{
          padding: 5px 0px;
      }
    }

    #submit-button{
      background-color: #E0E5EC;
      font-weight: bold;
      width: 100px;
      border-radius: 5px; 
      border: none;
      box-shadow: 6px 6px 12px 0 #A3B1C6, -6px -6px 12px 0  #F6F7F9;
    }

    #submit-button:active {
      border-radius: 5px;
      background: #E0E5EC;
      box-shadow: inset 3px 3px 8px #A3B1C6,
                  inset -3px -3px 8px #F6F7F9;
    }
    
    #wrong-creds {
      color: #DC2626;
      margin: 5%;
    }
  }
`     

// kalo nak pake antd, banyak dah ada component2nya: https://ant.design/components/overview/

// form, username and password, method post, '/login'
function Login() {
  const [formData, setFormData] = useState({username: '', password: ''})
  const [wrongCreds, setWrongCreds] = useState(false)
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    let body = new FormData()
    body.append('username', formData.username)
    body.append('password', formData.username)

    axios.post('/login', body)
      .then(res => {
        // setIsLoggedIn(true)
        // props.setJwtToken(res.data.token)
        console.log(res.data)
        localStorage.setItem('jwt-token', res.data.token)
        history.push('/dashboard')
      })
      .catch(err => {
        // history.push('/login')
        setWrongCreds(true)
        setFormData({username: '', password: ''})
        console.log('unable to log in', err)
      })
  }

  const handleChange = e => {
      setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  return (
    <>
      <FormContainer>
        <div id='neum-cont'>
          <Header/> 
          {/* <form method='POST' action='/login'>  */}
          <form method='POST' onSubmit={handleSubmit}> 
            <div className='input-box'>
              <label>Username</label>
              <input required type="text"
                name='username' 
                value={formData.username} 
                placeholder="Your username"
                onChange={handleChange}
              />
            </div>
            <div className='input-box'>
              <label>Password</label>
              <input required type="password"
                name='password'
                value={formData.password}
                placeholder="Your password"
                onChange={handleChange}
              />
            </div>
            <Button type="default" htmlType="submit" id='submit-button'>Login</Button>
            {wrongCreds ? <p id='wrong-creds'>Wrong Credentials</p> : null}
          </form>
        </div>
      </FormContainer>
    </>
  )
}
export default Login
