import './index.css'

const SkillItem = props => {
  const {skillDetails} = props

  return (
    <li className="skill-item">
      <img
        src={skillDetails.image_url}
        alt={name}
        className="company-logo"
      />
      <p>{skillDetails.name}</p>
    </li>
  )
}

export default SkillItem
