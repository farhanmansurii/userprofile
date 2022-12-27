import React, { useState } from 'react'

function EditableUserProfile({ user }) {
  const [name, setName] = useState(user.first)
  const [email, setEmail] = useState(user.email)
  const [profilePicture, setProfilePicture] = useState(user.picture)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Validate form data
    if (!name || !email) {
      setError('Name and email are required')
      return
    }

    // Save data to database
    saveUserData({ name, email, picture })
      .then(() => {
        setError(null)
        setSuccess('Profile updated successfully')
      })
      .catch(() => {
        setError('An error occurred while saving your profile. Please try again later.')
        setSuccess(null)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <label>
        Name:
        <input type="text" value={first} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Profile Picture:
        <input type="file" onChange={handleProfilePictureChange} />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  )
}

export default EditableUserProfile
