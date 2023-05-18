import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
const botnm=1
  return (
    <div>
      <Link to={`/customisation/${botnm}`}>Chatbot 1</Link>
      <button >Create new</button>
        </div>
  )
}

export default Homepage