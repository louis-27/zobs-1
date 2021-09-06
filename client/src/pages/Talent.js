import { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { Button, Form, Upload, message, Input } from 'antd';
import { InboxOutlined, CloseOutlined } from '@ant-design/icons';
import Header from '../components/Header';

function Talent({ match }) {
  const [jobPosts, setJobPosts] = useState([])

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

  const isValidId = () => jobPosts.some(i => i.uri === match.params.id)

  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: false,
    // action: '/talent/:id',
    customRequest: () => console.log('dummy'),
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleSubmit = (values) => {
    const jwt = localStorage.getItem('jwt-token')
    let body = new FormData()
    body.append('name', values.name)
    body.append('email', values.email)
    body.append('phone', values.phone)
    body.append('file', values.file.file.originFileObj)
    // console.log('PANTEK', values.file.file.originFileObj)
    // console.log(`/talent/${match.params.id}`)

    axios.post(`/talent/${match.params.id}`, body, {headers: {'x-access-token': jwt, 'Content-Type': 'multipart/form-data'}})
      .then(res => {
        console.log('upload successful', res)
      })
      .catch(err => {
        console.log('unable to submit form', err)
      })
    console.log(values)
  }

  // Form Layout
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  }

  const buttonItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 4
    }
  }

  const talent = (
    <TalentContainer>
      <Header/>
        <div id='talent-cont'>
          <h1>YOU ARE CURRENTLY APPLYING FOR:</h1>
          {/* <h2>{ jobPosts.find(i => i.uri === match.params.id) || 'wtf?' }</h2> */}
            <h2>"Job Title", at "Company Name"</h2>
            <SubmitTalent activator={ ({ setIsOpen }) => (
              <button id='open-dragger' onClick={ () => setIsOpen(true) }>
                Upload CV
              </button>
            )}>

              <Form 
                {...formItemLayout}
                onFinish={ handleSubmit }
              >
                <Form.Item
                  label="Name"
                  name='name'
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input className="input-form"/>
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Invalid email',
                    },
                    {
                      required: true,
                      message: 'Please input your email'
                    }
                  ]}
                >
                  <Input className="input-form"/>
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number'
                    }
                  ]}
                >
                  <Input className="input-form"/>
                </Form.Item>

                <Form.Item 
                  name="file"
                  label="Upload CV:"
                >
                  <Dragger {...props} className="input-form">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  </Dragger>
                </Form.Item>

                <Form.Item
                  {...buttonItemLayout}
                >
                  <Button type="primary" htmlType="submit" className="submit-form">
                    Submit
                  </Button>
                </Form.Item>
              </Form>

            </SubmitTalent>
        </div>
    </TalentContainer>
  )

  return (
    <>
    {isValidId() ? talent : <>404 not found</>}
    </>
  )
}

function SubmitTalent({ activator, children }) {
  const [isOpen, setIsOpen] = useState(false)

  const content = isOpen && (
    <OverlayContainer>
      <button id='close-overlay' onClick={() => setIsOpen(false)}>
        <CloseOutlined />
      </button>
      { children }
      
    </OverlayContainer>
  )
  return (
    <>
      { activator({ setIsOpen })}
      { ReactDom.createPortal(content, document.getElementById('overlay'))}
    </>
  )
}

const TalentContainer = styled.div`
  padding: 4% 15% 8% 15%;
  background-color: #E0E5EC;
  width: 100%; 
  height: 100vh;

  #talent-cont {
    margin-top: 8%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    color: #2563EB;
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 0;
    text-align: center;
  }

  h2{
    font-size: 36px;
  }

  #open-dragger {
    margin-top: 35px;
    background-color: #E0E5EC;

    font-size: 20px;
    text-align: center;
    font-weight: bold;

    width: 150px;
    height: 48px;

    border-radius: 7px;
    border: none;
    box-shadow: 6px 6px 12px 0 #A3B1C6, -6px -6px 12px 0  #F6F7F9;
    cursor: pointer;
    
    :active {
      border-radius: 5px;
        background: #E0E5EC;
        box-shadow: inset 3px 3px 8px #A3B1C6,
                    inset -3px -3px 8px #F6F7F9;
    }
  }

`

const OverlayContainer = styled.div`
  width: 80%;
  height: 85%;
  color: red;
  background-color: #E0E5EC;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  border-radius: 20px;
  box-shadow: 6px 6px 12px 0 #A3B1C6, -6px -6px 12px 0  #F6F7F9;

  .input-form{
    background-color: #E0E5EC;
    border-radius: 10px;
    box-shadow: inset 3px 3px 8px #A3B1C6,
                    inset -3px -3px 8px #F6F7F9;
    border: none;
  }

  .submit-form{
    border-radius: 10px;
    box-shadow: 6px 6px 12px 0 #A3B1C6, -6px -6px 12px 0  #F6F7F9;
  }

  #close-overlay {
    color: #222222;
    position: relative;
    background-color: #E0E5EC;
    border-radius: 50%;
    top: 2%;
    left: 95%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    border: none;
    box-shadow: 6px 6px 12px 0 #A3B1C6, -6px -6px 12px 0  #F6F7F9;
    
    :hover {
      color: #FF4500;
    }

    :active {
      box-shadow: inset 3px 3px 8px #A3B1C6,
                    inset -3px -3px 8px #F6F7F9;
      transition: all 0.2s ease;
    }
  }

  `

export default Talent
