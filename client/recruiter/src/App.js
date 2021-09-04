import {useState, useEffect} from 'react'

function App() {
  const [jobPosts, setJobPosts] = useState({})
  useEffect(() => {
    fetch('/admin').then(res => res.json()).then(data => {
      setJobPosts(data)
    })
  }, [])

  return (
    <p>{JSON.stringify(jobPosts)}</p>
  )
}

export default App
