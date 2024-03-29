import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import {
    doc,
    updateDoc,
    collection,
    getDocs,
    query,
    where,
    orderBy,
    deleteDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'

import { db } from '../firebase.config'
import arrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from './ListingItem'

const Profile = () => {
    const auth = getAuth()

    const [changeDetails, setChangeDetails] = useState(false)
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const [formData, setFormData] = useState({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
    })

    const { name, email } = formData

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserListings = async () => {
            const listingsRef = collection(db, 'listings')
            const fQuery = query(
                listingsRef,
                where('userRef', '==', auth.currentUser.uid),
                orderBy('timestamp', 'desc')
            )

            const querySnap = await getDocs(fQuery)
            const listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })

            setListings(listings)
            setLoading(false)
        }

        fetchUserListings()
    }, [auth.currentUser.uid])

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

    const onEditHandler = (listingId) => navigate(`/edit-listing/${listingId}`)

    const onDeleteHandler = async (listingId) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await deleteDoc(doc(db, 'listings', listingId))
            const updatedListings = listings.filter(
                (listings) => listings.id !== listingId
            )
            setListings(updatedListings)
            toast.success('Successfully deleted listing!')
        }
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

                {!loading && listings?.length > 0 && (
                    <>
                        <p className="listingText">Your Listings</p>
                        <ul className="listingList">
                            {listings?.map((listing) => (
                                <ListingItem
                                    key={listing.id}
                                    listing={listing.data}
                                    id={listing.id}
                                    onDeleteHandler={() =>
                                        onDeleteHandler(listing.id)
                                    }
                                    onEditHandler={() =>
                                        onEditHandler(listing.id)
                                    }
                                />
                            ))}
                        </ul>
                    </>
                )}
            </main>
        </div>
    )
}

export default Profile
