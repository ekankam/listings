import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { db } from '../firebase.config'
import arrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

const Profile = () => {
    const auth = getAuth()

    const [changeDetails, setChangeDetails] = useState(false)

    const [formData, setFormData] = useState({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
    })

    const { name, email } = formData

    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmitHandler = async () => {
        try {
            if (auth?.currentUser?.displayName !== name) {
                // update display name in firebase
                await updateProfile(auth?.currentUser, { displayName: name })

                // update in firestore
                const userRef = doc(db, 'users', auth?.currentUser.uid)
                await updateDoc(userRef, { name })
            }
        } catch (error) {
            toast.error('Could not update profile details!')
        }
    }

    const onlogoutHandler = () => {
        auth.signOut()
        navigate('/')
    }

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button
                    type="button"
                    className="logOut"
                    onClick={onlogoutHandler}
                >
                    Logout
                </button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p
                        className="changePersonalDetails"
                        onClick={() => {
                            // if changeDetails is true, then execute the onSubmitHandler
                            changeDetails && onSubmitHandler()
                            setChangeDetails((prevState) => !prevState)
                        }}
                    >
                        {changeDetails ? 'done' : 'change'}
                    </p>
                </div>
                <div className="profileCard">
                    <form>
                        <input
                            type="text"
                            id="name"
                            className={
                                !changeDetails
                                    ? 'profileName'
                                    : 'profileNameActive'
                            }
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChangeHandler}
                        />
                        <input
                            type="text"
                            id="email"
                            className={
                                !changeDetails
                                    ? 'profileEmail'
                                    : 'profileEmailActive'
                            }
                            disabled={!changeDetails}
                            value={email}
                            onChange={onChangeHandler}
                        />
                    </form>
                </div>
                <Link to="/create-listing" className="createListing">
                    <img src={homeIcon} alt="home" />
                    <p>Sell or rent your home</p>
                    <img src={arrowRightIcon} alt="arrow right" />
                </Link>
            </main>
        </div>
    )
}

export default Profile
