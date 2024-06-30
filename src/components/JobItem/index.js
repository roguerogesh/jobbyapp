import {Link, withRouter} from 'react-router-dom'
import {IoLocationOutline, IoBagHandle} from 'react-icons/io5'
import {FaStar} from 'react-icons/fa'

import './index.css'

const JobItem = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsData

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="logo-and-title">
          <img
            src={companyLogoUrl}
            alt={`company Logo`}
            className="company-logo"
          />
          <div>
            <h1>{title}</h1>
            <div className="rating">
              <FaStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-employment-range">
          <div className="location-employment">
            <IoLocationOutline className="icons" />
            <p>{location}</p>
            <IoBagHandle className="icons" />
            <p>{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />

        <h1>Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default withRouter(JobItem)
