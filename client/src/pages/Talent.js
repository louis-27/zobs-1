import { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { Form, Upload, message } from 'antd';
import { InboxOutlined, CloseOutlined } from '@ant-design/icons';
import Header from '../components/Header';

const TalentContainer = styled.div`
  padding: 4% 15% 8% 15%;
  background-color: #E0E5EC;
  width: 100%; 
  height: 100vh;
  #talent-cont{
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
  }

  #open-dragger:hover {
    border-radius: 5px;
      background: #E0E5EC;
      box-shadow: inset 3px 3px 8px #A3B1C6,
                  inset -3px -3px 8px #F6F7F9;
  }

`

const OverlayContainer = styled.div`
  width: 80%;
  height: 80%;
  color: red;
  background-color: grey;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);

  .input-box{
    margin: auto;
    width: 60%;
    height: 60%;
  }

  #close-overlay{
    color: black;
    position: relative;
    left: 95%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: none;
    border: none;
  }
`

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

  const handleSubmit = () => null

  const talent = (
    <TalentContainer>
      <Header/>
        <div id='talent-cont'>
          <h1>YOU ARE CURRENTLY APPLYING FOR:</h1>
          {/*<h2>{ jobPosts.find(i => i.uri === match.params.id) || 'wtf?' }</h2>*/}

            <SubmitTalent activator={ ({ setIsOpen }) => (
              <button id='open-dragger'onClick={ () => setIsOpen(true) }>
                Upload CV
              </button>
            )}>
              <Form onFinish={ handleSubmit }>
                <Form.Item name='file'>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit from
                      uploading company data or other band files
                    </p>
                  </Dragger>
                </Form.Item>
              </Form>
              {/*
              <div className='input-box'>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                  </p>
                </Dragger>
              </div>
              */}
            </SubmitTalent>
          {/* </form> */}
        </div>
    </TalentContainer>
  )

  return (
    <>
    {isValidId() ? talent : <>404 fuck you</>}
    </>
  )
}

function SubmitTalent({ activator, children }){
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

export default Talent
