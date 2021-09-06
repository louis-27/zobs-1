import { useState, useEffect } from 'react'
import axios from 'axios'

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

  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt-token')
  //   axios.get(`/results/${match.params.id}`, {headers: {'x-access-token': jwt}})
  //     .then(res => {
  //       console.log('should get data here', res.data)
  //       setResults(res.data.results)
  //     })
  //     .catch(err => {
  //       console.log('unable to fetch data', err)
  //     })
  // }, [])

  const isValidId = () => jobPosts.some(i => i.uri === match.params.id)

  const resultsList = (
    <>
      {results.map((val, i) => (
        <p key={i}>{val.name}</p>
      ))}
    </>
  )

  return (
    <>
    {isValidId() ? resultsList : <>404 not found</>}
    </>
  )
}

export default Results