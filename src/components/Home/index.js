import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the jobs that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="nav-link">
          <button className="find-jobs-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
