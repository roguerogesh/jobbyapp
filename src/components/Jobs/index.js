import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import EmploymentTypeList from '../EmploymentTypeList'
import SalaryRange from '../SalaryRange'
import FiltersGroup from '../FiltersGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const apiUrl = 'https://apis.ccbp.in/jobs'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: {},
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  retryFetchingData = () => {
    this.getProfileDetails()
    this.getJobs()
  }

  getProfileDetails = async () => {
    try {
      const jwtToken = Cookies.get('jwt_token')
      const profileApiUrl = 'https://apis.ccbp.in/profile'
      const response = await fetch(profileApiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        this.setState({profileData: data.profile_details})
      } else {
        throw new Error('Failed to fetch profile data')
      }
    } catch (error) {
      console.error('Error fetching profile data:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {searchInput, selectedEmploymentTypes, selectedSalaryRange} =
      this.state
    const searchQuery = searchInput ? `&search=${searchInput}` : ''
    const employmentTypesQuery =
      selectedEmploymentTypes.length > 0
        ? `&employment_type=${selectedEmploymentTypes.join(',')}`
        : ''
    const salaryRangeQuery = selectedSalaryRange
      ? `&minimum_package=${selectedSalaryRange}`
      : ''
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(
        `${apiUrl}?${employmentTypesQuery}${salaryRangeQuery}${searchQuery}`,
        options,
      )
      if (response.ok) {
        const fetchedData = await response.json()

        const updatedData = fetchedData.jobs.map(each => ({
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
          jobsList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        throw new Error('Failed to fetch job data')
      }
    } catch (error) {
      console.error('Error fetching job data:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleSearchInputChange = searchInput => {
    this.setState({searchInput})
  }

  handleEmploymentTypeChange = selectedEmploymentTypes => {
    this.setState({selectedEmploymentTypes}, () => {
      this.getJobs()
    })
  }

  handleSalaryRangeChange = selectedSalaryRange => {
    this.setState({selectedSalaryRange}, () => {
      this.getJobs()
    })
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
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
  )

  renderProductsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="all-products-container">
        <ul className="products-list">
          {jobsList.map(job => (
            <JobItem jobsData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {profileData, searchInput, apiStatus} = this.state

    return (
      <>
        <Header />
        <div className="job-container">
          <div>
            {profileData && Object.keys(profileData).length > 0 ? (
              <Profile profileData={profileData} />
            ) : (
              this.renderFailureView()
            )}
            <hr className="horizontal-line" />
            <h1 className="heading">Type of Employment</h1>

            <ul>
              {employmentTypesList.map(each => (
                <EmploymentTypeList
                  typeDetails={each}
                  key={each.employmentTypeId}
                  handleEmploymentTypeChange={this.handleEmploymentTypeChange}
                  selectedEmploymentTypes={this.state.selectedEmploymentTypes}
                />
              ))}
            </ul>

            <hr className="horizontal-line" />
            <h1 className="heading">Salary Range</h1>
            <ul>
              {salaryRangesList.map(each => (
                <SalaryRange
                  salary={each}
                  key={each.salaryRangeId}
                  handleSalaryRangeChange={this.handleSalaryRangeChange}
                  selectedSalaryRange={this.state.selectedSalaryRange}
                />
              ))}
            </ul>
          </div>
          <div className="all-products-section">
            <FiltersGroup
              searchInput={searchInput}
              handleSearchInputChange={this.handleSearchInputChange}
              getJobs={this.getJobs}
            />
            {apiStatus === apiStatusConstants.inProgress && (
              <div data-testid="loader" className="loader-container">
                <Loader
                  type="ThreeDots"
                  color="#0b69ff"
                  height="50"
                  width="50"
                />
              </div>
            )}
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
