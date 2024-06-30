import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

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

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute
          exact
          path="/jobs"
          component={Jobs}
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
        />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App
