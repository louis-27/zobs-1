import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { HiUserCircle } from 'react-icons/hi'
import { Button, Select, Input, Radio} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

import { Wrapper } from '../styles/style'
import Header from '../components/Header'
import { Logo } from '../components/Logo/Logo'
import DashboardModal from '../components/DashboardModal'
import { Post } from '../components/Post'
import Talent from './Talent'

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('jwt-token') ? true : false)
  const [jobPosts, setJobPosts] = useState([])
  const [jobPostsFormData, setJobPostsFormData] = useState({
    title: '',
    tag: '',
    currentRequirement: '',
    requirements: [],
  })
  // for radio
  const [value, setValue] = useState(0);
  
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

  const Dashboard = (
    <Wrapper>
      <HeaderContainer>
        <Logo size="150px"/>
        <div className="user-profile">
          <HiUserCircle />
          <span>Admin</span>
        </div>
      </HeaderContainer>
      <DashboardContainer>
        <div className="dashboard__top">
          <span>All Jobs</span>
          <DashboardModal activator={({setIsOpen}) => (
            <Button className="add-button" type="primary" icon={<PlusOutlined/>} onClick={ () => setIsOpen(true) }>
              New Job
            </Button>
          )}>
            <h1>FORM PLACEHOLDER</h1>
            <form>
                <p className="title-form">Title</p>
                <Input 
                 className="input-form"
                 placeholder="Title"
                 style={{width: '80%'}}
                />
                <p className="title-form">Requirements</p>
                <Select
                  className="input-form"
                  mode="tags"
                  allowClear
                  style={{width: '80%'}}
                  placeholder="Requirements"
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
                <p className="title-form">Tags</p>
                <Radio.Group className="input-form" value={value}
                  onChange ={ e => {
                    setValue(e.target.value);
                  }}>
                  <Radio value={1}>Business</Radio>
                  <Radio value={2}>Tech</Radio>
                  <Radio value={3}>Design</Radio>
                  {/* <Radio value={4}></Radio> */}
                </Radio.Group>
            </form>
          </DashboardModal>
        </div>

        <br />


        <div className="dashboard__posts">
            {testink.map(job => (
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
      {isLoggedIn ? Dashboard : <>not logged in</>}
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

    svg {
      font-size: 1.5em;
    }
  }
`

const DashboardContainer = styled.div`
  padding-bottom: 50px;

  .dashboard__top {
    display: flex;
    justify-content: space-between;

    margin-bottom: 25px;

    > span {
      font-size: 1.5em;
      font-weight: 600;
    }

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

`

export default Dashboard
