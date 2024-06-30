import './index.css'

const Profile = ({profileData}) => {
  // Function to convert keys of an object to camelCase
  const convertToCamelCase = obj => {
    return Object.keys(obj).reduce((camelCaseObj, key) => {
      const camelCaseKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase())
      camelCaseObj[camelCaseKey] = obj[key]
      return camelCaseObj
    }, {})
  }

  // Convert profileData to camelCase
  const profileDataCamelCase = convertToCamelCase(profileData)

  // Destructure the camelCase profileData
  const {name, profileImageUrl, shortBio} = profileDataCamelCase

  return (
    <div className="profile-container">
      <img src={profileImageUrl} alt="profile" className="profile" />
      <h1 className="name">{name}</h1>
      <p className="bio">{shortBio}</p>
    </div>
  )
}

export default Profile
