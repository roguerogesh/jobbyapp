import React from 'react';
import './index.css';

const EmploymentTypeList = props => {
  const { typeDetails, handleEmploymentTypeChange, selectedEmploymentTypes } = props;
  const { label, employmentTypeId } = typeDetails;

  const handleChange = () => {
    const updatedSelection = selectedEmploymentTypes.includes(employmentTypeId)
      ? selectedEmploymentTypes.filter(type => type !== employmentTypeId)
      : [...selectedEmploymentTypes, employmentTypeId];
    handleEmploymentTypeChange(updatedSelection);
  };

  return (
    <li>
      <input
        type="checkbox"
        id={label.toLowerCase().replace(' ', '-')}
        checked={selectedEmploymentTypes.includes(employmentTypeId)}
        onChange={handleChange}
      />
      <label
        htmlFor={label.toLowerCase().replace(' ', '-')}
        className="label-text"
      >
        {label}
      </label>
    </li>
  );
};

export default EmploymentTypeList;
