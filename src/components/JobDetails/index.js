import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {IoLocationOutline, IoBagHandle} from 'react-icons/io5'
import {FaStar} from 'react-icons/fa'

import SkillItem from '../SkillItem'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobData: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  retryFetchingData = () => {
    this.getJobData()
  }

  getJobData = async () => {
    try {
      const {match} = this.props
      const {params} = match
      const {id} = params

      this.setState({
        apiStatus: apiStatusConstants.inProgress,
      })

      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const fetchedData = await response.json()
        const {job_details, similar_jobs} = fetchedData // Destructure job_details from response

        const formattedData = {
          companyLogoUrl: job_details.company_logo_url,
          companyWebsiteUrl: job_details.company_website_url,
          employmentType: job_details.employment_type,
          title: job_details.title,
          id: job_details.id,
          jobDescription: job_details.job_description,
          location: job_details.location,
          packagePerAnnum: job_details.package_per_annum,
          rating: job_details.rating,
          skills: job_details.skills,
          lifeAtCompany: job_details.life_at_company,
          // Add other properties as needed
        }

        const similarJobs = similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }))

        this.setState({
          jobData: formattedData,
          similarJobs,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        // If response is not ok
        throw new Error('Failed to fetch job details')
      }
    } catch (error) {
      console.error('Error fetching job data:', error)
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {jobData, apiStatus, similarJobs} = this.state

    return (
      <div className="job-item-details-bg-container">
        {apiStatus === apiStatusConstants.inProgress && (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {apiStatus === apiStatusConstants.success && (
          <div>
            <div className="job-item">
              <div className="logo-and-title">
                <img
                  src={jobData.companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo"
                />
                <div>
                  <h1>{jobData.title}</h1>
                  <div className="rating">
                    <FaStar className="star-icon" />
                    <p>{jobData.rating}</p>
                  </div>
                </div>
              </div>

              <div className="location-employment-range">
                <div className="location-employment">
                  <IoLocationOutline className="icons" />
                  <p>{jobData.location}</p>
                  <IoBagHandle className="icons" />
                  <p>{jobData.employmentType}</p>
                </div>
                <p className="package">{jobData.packagePerAnnum}</p>
              </div>
              <hr className="horizontal-line" />
              <a href={jobData.companyWebsiteUrl} className="visit-button">
                Visit
              </a>
              <img src={jobData.companyWebsiteUrl} alt="website logo" />

              <h1>Description</h1>
              <p>{jobData.jobDescription}</p>

              <h1>Skills</h1>
              <ul className="skill-container">
                {jobData.skills.map(each => (
                  <SkillItem skillDetails={each} key={each.id}/>
                ))}
              </ul>
              <h1>Life at Company</h1>
              <div className="life_at_company">
                <p>{jobData.lifeAtCompany.description}</p>
                <img src={jobData.lifeAtCompany.image_url} />
              </div>
            </div>

            <h1>Similar Jobs</h1>
            <ul>
              {similarJobs.map(each => (
                <SimilarJobs similarJobDetails={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
        {apiStatus === apiStatusConstants.failure && (
          <div className="products-error-view-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="products-failure-img"
            />
            <h1 className="product-failure-heading-text">
              Oops! Something Went Wrong
            </h1>
            <p className="products-failure-description">
              We cannot seem to find the page you are looking for
            </p>
            <button onClick={this.retryFetchingData}>Retry</button>
          </div>
        )}
      </div>
    )
  }
}

export default JobDetails
