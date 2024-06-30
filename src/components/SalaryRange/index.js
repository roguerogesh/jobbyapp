import React from 'react'
import './index.css'

const SalaryRange = props => {
  const {salary, handleSalaryRangeChange, selectedSalaryRange} = props
  const {label, salaryRangeId} = salary

  const handleChange = () => {
    handleSalaryRangeChange(salaryRangeId)
  }

  return (
    <li>
      <input
        type="radio"
        id={label.toLowerCase().replace(' ', '-')}
        checked={selectedSalaryRange === salaryRangeId}
        onChange={handleChange}
      />
      <label
        htmlFor={label.toLowerCase().replace(' ', '-')}
        className="label-text"
      >
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
