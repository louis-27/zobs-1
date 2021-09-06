import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { HiUserCircle } from 'react-icons/hi'
import { Button } from 'antd'
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
            <Button type="primary" icon={<PlusOutlined/>} onClick={ () => setIsOpen(true) }>
              New Job
            </Button>
          )}>
            <h1>FORM PLACEHOLDER</h1>
            <form>
              <input type='text' placeholder='title'/>
              <input id="requirement-input" type='text' placeholder='requirements'
                // value={ jobPostsFormData.currentRequirement }
                
                onKeyDown={ e => {
                    if(e.code === 'Enter') {
                      // let inputted = document.getElementById("requirement-input").value
                      // if(inputted.length > 0){
                      //   jobPostsFormData.requirements.push(inputted)
                      //   var element = "<div style=\"background-color: aquamarine;margin-right: 5px;\"><p>" + inputted + "</p></div>"
                      //   document.getElementById("requirement-input").value = "" 
                      //   document.getElementById("container-pushing").insertAdjacentHTML('beforeend', element)
                      // }
                    }
                  }
                } 
              />
              {/* <div id="container-pushing" style="display: flex;flex-direction: row;"></div> */}
              {jobPostsFormData.requirements.map((val, i) => (
                <button key='i'>{ val }</button>
              ))}
            </form>
          </DashboardModal>
        </div>

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
      {isLoggedIn ? Dashboard : <>not logged in</>}
    </>
  )
}

const testink = [
  {name: "Back-end Developer", tag: "Tech", applicants: 1209},
  {name: "Product Manager", tag: "Business", applicants: 856},
  {name: "Illustrator", tag: "Design", applicants: 744},
  {name: "Geming Buddy", tag: "Miscellaneous", applicants: 69},
  {name: "Software Engineer", tag: "Tech", applicants: 6900},
  {name: "Back-end Developer", tag: "Tech", applicants: 1209},
  {name: "Product Manager", tag: "Business", applicants: 856},
  {name: "Illustrator", tag: "Design", applicants: 744},
  {name: "Geming Buddy", tag: "Miscellaneous", applicants: 69},
  {name: "Back-end Developer", tag: "Tech", applicants: 1209},
  {name: "Product Manager", tag: "Business", applicants: 856},
  {name: "Illustrator", tag: "Design", applicants: 744},
  {name: "Geming Buddy", tag: "Miscellaneous", applicants: 69},
  {name: "Back-end Developer", tag: "Tech", applicants: 1209},
  {name: "Product Manager", tag: "Business", applicants: 856},
  {name: "Illustrator", tag: "Design", applicants: 744},
  {name: "Geming Buddy", tag: "Miscellaneous", applicants: 69},
  {name: "Software Engineer", tag: "Tech", applicants: 6900},
  {name: "Back-end Developer", tag: "Tech", applicants: 1209},
  {name: "Product Manager", tag: "Business", applicants: 856},
  {name: "Illustrator", tag: "Design", applicants: 744},
  {name: "Geming Buddy", tag: "Miscellaneous", applicants: 69},
  {name: "Back-end Developer", tag: "Tech", applicants: 1209},
  {name: "Product Manager", tag: "Business", applicants: 856},
  {name: "Illustrator", tag: "Design", applicants: 744},
  {name: "Geming Buddy", tag: "Miscellaneous", applicants: 69}
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
  .dashboard__top {
    display: flex;
    justify-content: space-between;

    margin-bottom: 25px;

    > span {
      font-size: 1.5em;
      font-weight: 600;
    }
  }

  .dashboard__posts {
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); */
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    /* grid-template-columns: repeat(auto-fit, 350px); */
    gap: 15px;
  }
`

export default Dashboard
