import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { HiUserCircle } from 'react-icons/hi'
import { Button, Select, Input, Radio, Menu, Dropdown, Form } from 'antd'
import { PlusOutlined, DownOutlined} from '@ant-design/icons'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import { Wrapper } from '../styles/style'
import Header from '../components/Header'
import { Logo } from '../components/Logo/Logo'
import DashboardModal from '../components/DashboardModal'
import { Post } from '../components/Post'
import Talent from './Talent'

function Dashboard() {

  const [value, setValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('jwt-token') ? true : false)
  const [jobPosts, setJobPosts] = useState([]);
  const [jobPostsFormData, setJobPostsFormData] = useState({
    title: '',
    tag: '',
    currentRequirement: '',
    requirements: [],
  })
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt-token')
    console.log(jwt)
    axios.get('/jobpost', {headers: {'x-access-token': jwt}})
      .then(res => {
        setJobPosts(res.data.job_posts)
        console.log('should get data here', res.data)
      })
      .catch(err => {
        console.log('unable to fetch data', err.response.data.message)
      })
  }, [])

  useEffect(() => {
    console.log(jobPosts)
  }, [jobPosts])

  const handleSubmit = (values) => {
    const tags = ['Business', 'Tech', 'Design']

    const jwt = localStorage.getItem('jwt-token')
    let body = new FormData()
    body.append('title', values.title)
    body.append('tag', tags[values.tag])
    body.append('requirements', values.requirements)
    body.append('uri', uuidv4())

    axios.post('/jobpost', body, {headers: {'x-access-token': jwt}})
      .then(res => {
        console.log('submit successfull', res)
        window.location.reload()
      })
      .catch(err => {
        console.log('unable to submit job post', err)
        window.location.reload()
      })
  }

  const { SubMenu } = Menu;

  const dashboard = (
    <Wrapper>
      <HeaderContainer>
        <a href='/'><Logo size="150px"/></a>
        <div className="user-profile">
              {/* <HiUserCircle/> */}
              {/* <span>Admin</span> */}
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
      <DashboardContainer>
        <div className="dashboard__top">
          <span id="all-title" >All Jobs</span>
          <DashboardModal activator={({setIsOpen}) => (
            <Button className="add-button" type="primary" icon={<PlusOutlined/>} onClick={ () => setIsOpen(true) }>
              New Job
            </Button>
          )}>
            <Form onFinish={ handleSubmit }>
              <p className="title-form">Title</p>
              <Form.Item name='title' required>
                <Input 
                 className="input-form"
                 id="text-input"
                 placeholder="Title"
                 style={{width: '80%'}}
                />
              </Form.Item>

              <p className="title-form">Requirements</p>
              <Form.Item name='requirements'>
                <Select
                  className="input-form"
                  mode="tags"
                  allowClear
                  style={{width: '80%'}}
                  placeholder="Add keywords"
                  // defaultValue={[jobPostsFormData.currentRequirement]}
                  // value={jobPostsFormData.currentRequirement}
                  onChange={() => console.log('testing', jobPostsFormData.requirements)}
                  onKeyDown={e => {
                    if(e.code === "Enter"){
                      const dup = jobPostsFormData.requirements
                      dup.push(e.target.value)
                      setJobPostsFormData(prev => ({...prev, requirements: dup, currentRequirement: ''}))
                    }
                  }}
                >
                  {jobPostsFormData.requirements.map((val, i) => (
                    <Select.Option key={i}>{val}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <p className="title-form">Tags</p>
              <Form.Item name='tag'>
                <Radio.Group className="input-form" value={value}
                  onChange ={ e => {
                    setValue(e.target.value);
                  }}>
                  <Radio className="radio-input" value={0}>Business</Radio>
                  <Radio className="radio-input" value={1}>Tech</Radio>
                  <Radio className="radio-input" value={2}>Design</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button style={{ borderRadius: '10px', backgroundColor: '#E0E5EC' }} type="submit" htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </DashboardModal>
        </div>

        <br />


        <div className="dashboard__posts">
            {jobPosts.map(job => (
              <Post 
                key={job.uri}
                name={job.title}
                tag={job.tag}
                uri={job.uri}
                applicants={job.applicants}
              />
            ))}
        </div>
      </DashboardContainer>
    </Wrapper>
  );

  return (
    <>
      {isLoggedIn ? dashboard : <>not logged in</>}
    </>
  )
}

const testink = [
  {title: "Back-end Developer", tag: "Tech", applicants: 1209},
  {title: "Product Manager", tag: "Business", applicants: 856},
  {title: "Illustrator", tag: "Design", applicants: 744},
  {title: "Software Engineer", tag: "Tech", applicants: 6900},
  {title: "Back-end Developer", tag: "Tech", applicants: 1209},
  {title: "Product Manager", tag: "Business", applicants: 856},
  {title: "Illustrator", tag: "Design", applicants: 744},
  {title: "Back-end Developer", tag: "Tech", applicants: 1209},
  {title: "Product Manager", tag: "Business", applicants: 856},
  {title: "Illustrator", tag: "Design", applicants: 744},
  {title: "Back-end Developer", tag: "Tech", applicants: 1209},
  {title: "Product Manager", tag: "Business", applicants: 856},
  {title: "Illustrator", tag: "Design", applicants: 744},
  {title: "Software Engineer", tag: "Tech", applicants: 6900},
  {title: "Back-end Developer", tag: "Tech", applicants: 1209},
  {title: "Product Manager", tag: "Business", applicants: 856},
  {title: "Illustrator", tag: "Design", applicants: 744},
  {title: "Back-end Developer", tag: "Tech", applicants: 1209},
  {title: "Product Manager", tag: "Business", applicants: 856},
  {title: "Illustrator", tag: "Design", applicants: 744},
]

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

const DashboardContainer = styled.div`
  padding-bottom: 50px;

  .dashboard__top {
    display: flex;
    justify-content: space-between;

    margin-bottom: 25px;

    .add-button{
      background-color: #E0E5EC;
      font-weight: bold;
      color: #1890ff;
      border: none;
      border-radius: 10px;
      box-shadow: 6px 6px 12px 0 #A3B1C6, -6px -6px 12px 0  #F6F7F9;

      :active{
        box-shadow: inset 3px 3px 8px #A3B1C6,
                  inset -3px -3px 8px #F6F7F9;
      }
    }
  }

  .dashboard__posts {
    border-radius: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
  }

  #all-title {
    font-weight: bold;
    font-size: 20px;
  }
`

export default Dashboard
